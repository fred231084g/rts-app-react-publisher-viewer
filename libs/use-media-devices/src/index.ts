import { useEffect, useMemo, useReducer } from 'react';
import useState from 'react-usestateref';
export type MediaDevices = {
  cameraList: InputDeviceInfo[];
  microphoneList: InputDeviceInfo[];
  setCamera: (device: InputDeviceInfo) => void;
  setMicrophone: (device: InputDeviceInfo) => void;
  camera?: InputDeviceInfo;
  microphone?: InputDeviceInfo;
  mediaStream?: MediaStream;
  startDisplayCapture: () => Promise<void>;
  stopDisplayCapture: () => void;
  displayStream?: MediaStream;
  applyMediaTrackConstraints: (
    audioConstraints: MediaTrackConstraints,
    videoConstraints: MediaTrackConstraints
  ) => Promise<void>;
  // Supported capabilites of selected camera and microphone
  cameraCapabilities?: MediaTrackCapabilities;
  microphoneCapabilities?: MediaTrackCapabilities;
  // Current settings of selected camera and microphone
  cameraSettings?: MediaTrackSettings;
  microphoneSettings?: MediaTrackSettings;
  streams: StreamsReducerState;
  addStream: (type: StreamTypes, microphone?: InputDeviceInfo, camera?: InputDeviceInfo) => Promise<void>;
  toggleAudio: (id: StreamId) => void;
  toggleVideo: (id: StreamId) => void;
  reset: () => void;
};

export enum StreamTypes {
  MEDIA = 'MEDIA',
  DISPLAY = 'DISPLAY',
}

type Stream = {
  type: StreamTypes;
  display: MediaStream;
  capabilities: {
    camera: MediaTrackCapabilities;
    microphone: MediaTrackCapabilities;
  };
  settings: {
    camera: MediaTrackSettings;
    microphone: MediaTrackSettings;
  };
  device: {
    camera?: InputDeviceInfo;
    microphone?: InputDeviceInfo;
  };
  state: {
    muteAudio: boolean;
    displayVideo: boolean;
    codec: string | null;
  };
};

const initialStreamState: Stream['state'] = {
  muteAudio: true,
  displayVideo: true,
  codec: null,
};

type StreamId = string;

type StreamsReducerState = Map<StreamId, Stream>;

enum StreamsActionType {
  ADD_STREAM = 'ADD_STREAM',
  REMOVE_STREAM = 'REMOVE_STREAM',
  RESET = 'RESET',
  TOGGLE_AUDIO = 'TOGGLE_AUDIO',
  TOGGLE_VIDEO = 'TOGGLE_VIDEO',
}

type StreamsAction =
  | {
      type: StreamsActionType.RESET;
    }
  | {
      type: StreamsActionType.ADD_STREAM;
      id: StreamId;
      stream: Stream;
    }
  | {
      type: StreamsActionType.REMOVE_STREAM | StreamsActionType.TOGGLE_AUDIO | StreamsActionType.TOGGLE_VIDEO;
      id: StreamId;
    };

const stopTracks = (stream: MediaStream) => {
  stream.getTracks().forEach((track) => {
    track.stop();
  });
};

const streamsReducer = (state: StreamsReducerState, action: StreamsAction) => {
  switch (action.type) {
    case StreamsActionType.RESET: {
      [...state].forEach(([_, stream]) => {
        stopTracks(stream.display);
      });
      return new Map();
    }
    case StreamsActionType.ADD_STREAM: {
      const updated = new Map(state);
      updated.set(action.id, action.stream);
      return updated;
    }
    case StreamsActionType.REMOVE_STREAM: {
      const prev = state.get(action.id);
      const updated = new Map(state);
      if (prev) {
        stopTracks(prev.display);
      }
      updated.delete(action.id);
      return updated;
    }
    case StreamsActionType.TOGGLE_AUDIO: {
      const prev = state.get(action.id);
      const updated = new Map(state);
      if (prev) {
        const audioTracks = prev.display.getAudioTracks();
        if (audioTracks && audioTracks.length) {
          audioTracks[0].enabled = !audioTracks[0].enabled;
          updated.set(action.id, {
            ...prev,
            state: {
              ...prev.state,
              muteAudio: !prev.state.muteAudio,
            },
          });
        }
      }
      return updated;
    }
    case StreamsActionType.TOGGLE_VIDEO: {
      const prev = state.get(action.id);
      const updated = new Map(state);
      if (prev) {
        const videoTracks = prev.display.getVideoTracks();
        if (videoTracks && videoTracks.length) {
          videoTracks[0].enabled = !videoTracks[0].enabled;
          updated.set(action.id, {
            ...prev,
            state: {
              ...prev.state,
              displayVideo: !prev.state.displayVideo,
            },
          });
        }
      }
      return updated;
    }

    default:
      console.error('Unknown action');
      return state;
  }
};

type UseMediaDevicesArguments = {
  handleError?: (error: string) => void;
};

const idealCameraConfig = { width: { ideal: 7680 }, height: { ideal: 4320 }, aspectRatio: 7680 / 4320 };

const isUniqueDevice = (deviceList: InputDeviceInfo[], device: InputDeviceInfo) => {
  return !(device.deviceId === 'default' || deviceList.some((item) => item.deviceId === device.deviceId));
};

type MediaDevicesLists = { cameraList: InputDeviceInfo[]; microphoneList: InputDeviceInfo[] };

const useMediaDevices = ({ handleError }: UseMediaDevicesArguments = {}): MediaDevices => {
  const [streams, dispatch] = useReducer(streamsReducer, new Map());
  const [cameraList, setCameraList] = useState<InputDeviceInfo[]>([]);
  const [microphoneList, setMicrophoneList] = useState<InputDeviceInfo[]>([]);

  const [camera, setCamera] = useState<InputDeviceInfo>();
  const [microphone, setMicrophone] = useState<InputDeviceInfo>();

  const [mediaStream, setMediaStream, mediaStreamRef] = useState<MediaStream>();
  const [displayStream, setDisplayStream, displayStreamRef] = useState<MediaStream>();

  const _handleError = (error: unknown) => {
    if (error instanceof Error) {
      handleError?.(error.message);
    } else {
      handleError?.(`${error}`);
    }
  };

  const getMediaDevicesLists = async (): Promise<MediaDevicesLists> => {
    const microphoneList: InputDeviceInfo[] = [];
    const cameraList: InputDeviceInfo[] = [];
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      devices.forEach((device) => {
        if (device.kind === 'audioinput' && isUniqueDevice(microphoneList, device)) microphoneList.push(device);
        else if (device.kind === 'videoinput' && isUniqueDevice(cameraList, device)) cameraList.push(device);
      });
      setCameraList(cameraList);
      setMicrophoneList(microphoneList);
    } catch (error: unknown) {
      _handleError(error);
    }
    return Promise.resolve({ cameraList, microphoneList });
  };

  const addStream: MediaDevices['addStream'] = async (type, microphone, camera) => {
    try {
      let stream;
      if (type === StreamTypes.MEDIA) {
        if (microphone && camera) {
          const constraints = {
            audio: {
              deviceId: { exact: microphone.deviceId },
            },
            video: {
              deviceId: { exact: camera.deviceId },
              ...idealCameraConfig,
            },
          };
          stream = await navigator.mediaDevices.getUserMedia(constraints);
        }
      } else {
        const constraints = {
          video: { cursor: 'always' },
          audio: true,
        } as DisplayMediaStreamConstraints;
        stream = await navigator.mediaDevices.getDisplayMedia(constraints);
      }
      if (stream) {
        const audioTracks = stream.getAudioTracks()[0];
        const videoTracks = stream.getAudioTracks()[0];
        dispatch({
          type: StreamsActionType.ADD_STREAM,
          id: stream.id,
          stream: {
            type,
            display: stream,
            capabilities: {
              microphone: audioTracks.getCapabilities(),
              camera: videoTracks.getCapabilities(),
            },
            settings: {
              microphone: audioTracks.getSettings(),
              camera: videoTracks.getSettings(),
            },
            device: {
              microphone,
              camera,
            },
            state: initialStreamState,
          },
        });
      }
    } catch (error: unknown) {
      console.log(error);
      _handleError(error);
    }
  };

  const toggleAudio = (id: StreamId) => {
    dispatch({ type: StreamsActionType.TOGGLE_AUDIO, id });
  };

  const toggleVideo = (id: StreamId) => {
    dispatch({ type: StreamsActionType.TOGGLE_VIDEO, id });
  };

  const reset = () => {
    dispatch({ type: StreamsActionType.RESET });
  };

  const initializeDeviceList = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: idealCameraConfig,
      });
      if (stream) {
        stopTracks(stream);
        await getMediaDevicesLists();
        // const { cameraList, microphoneList } = await getMediaDevicesLists();
        // if (!camera) {
        //   setCamera(cameraList[0]);
        // } else {
        //   const prevCameraIsAvailable = cameraList.find((element) => element.deviceId === camera.deviceId);
        //   if (!prevCameraIsAvailable) {
        //     setCamera(cameraList[0]);
        //   }
        // }
        // if (!microphone) {
        //   setMicrophone(microphoneList[0]);
        // } else {
        //   const prevMicrophoneIsAvailable = microphoneList.find((element) => element.deviceId === microphone.deviceId);
        //   if (!prevMicrophoneIsAvailable) {
        //     setMicrophone(microphoneList[0]);
        //   }
        // }
      } else {
        _handleError(`Cannot get user's media stream`);
      }
    } catch (error: unknown) {
      _handleError(error);
    }
  };

  useEffect(() => {
    navigator.mediaDevices.addEventListener('devicechange', initializeDeviceList);
    return () => {
      navigator.mediaDevices.removeEventListener('devicechange', initializeDeviceList);
    };
  }, []);

  useEffect(() => {
    if (cameraList.length > 0 && microphoneList.length > 0 && streams.size === 0) {
      addStream(StreamTypes.MEDIA, microphoneList[0], cameraList[0]);
    }
  }, [streams, cameraList, microphoneList]);

  useEffect(() => {
    initializeDeviceList();
    return () => {
      dispatch({ type: StreamsActionType.RESET });
    };
  }, []);

  useEffect(() => {
    if (microphone && camera) {
      mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
      loadMediaStream(microphone.deviceId, camera.deviceId);
    }
  }, [camera, microphone]);

  const { microphoneCapabilities, cameraCapabilities } = useMemo(() => {
    const microphoneCapabilities = mediaStream?.getAudioTracks()[0].getCapabilities();
    const cameraCapabilities = mediaStream?.getVideoTracks()[0].getCapabilities();
    return { microphoneCapabilities, cameraCapabilities };
  }, [mediaStream]);

  const { microphoneSettings, cameraSettings } = useMemo(() => {
    const microphoneSettings = mediaStream?.getAudioTracks()[0].getSettings();
    const cameraSettings = mediaStream?.getVideoTracks()[0].getSettings();
    return { microphoneSettings, cameraSettings };
  }, [mediaStream]);

  const loadMediaStream = async (microphoneId: string, cameraId: string) => {
    try {
      const constraints = {
        audio: {
          deviceId: { exact: microphoneId },
        },
        video: {
          deviceId: { exact: cameraId },
          ...idealCameraConfig,
        },
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setMediaStream(stream);
    } catch (error: unknown) {
      _handleError(error);
    }
  };

  const startDisplayCapture = async (): Promise<void> => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { cursor: 'always' },
        audio: true,
      } as DisplayMediaStreamConstraints);
      setDisplayStream(stream);
      stream?.getVideoTracks()[0].addEventListener('ended', () => {
        setDisplayStream(undefined);
      });
      return Promise.resolve();
    } catch (error: unknown) {
      _handleError(error);
      return Promise.reject(error);
    }
  };

  const stopDisplayCapture = () => {
    if (!displayStreamRef.current) return;
    displayStreamRef.current.getTracks().forEach((track) => track.stop());
    setDisplayStream(undefined);
  };

  const applyMediaTrackConstraints = async (
    audioConstraints: MediaTrackConstraints,
    videoConstraints: MediaTrackConstraints
  ): Promise<void> => {
    // Chrome requires to create a new media stream if audio constraints are changed
    // [See this](https://bugs.chromium.org/p/chromium/issues/detail?id=796964)
    mediaStreamRef.current?.getTracks().forEach((track) => {
      track.stop();
    });
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        audio: audioConstraints,
        video: videoConstraints,
      });
      setMediaStream(newStream);
      return Promise.resolve();
    } catch (error: unknown) {
      _handleError(error);

      return Promise.reject(error);
    }
  };

  return {
    cameraList,
    microphoneList,
    camera,
    setCamera,
    microphone,
    setMicrophone,
    mediaStream,
    startDisplayCapture,
    stopDisplayCapture,
    displayStream,
    applyMediaTrackConstraints,
    cameraCapabilities,
    microphoneCapabilities,
    cameraSettings,
    microphoneSettings,
    streams,
    addStream,
    toggleAudio,
    toggleVideo,
    reset,
  };
};

export default useMediaDevices;
