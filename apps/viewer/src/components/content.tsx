import {
  VStack,
  Text,
  HStack,
  Flex,
  Spacer,
  Box,
  Heading,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  PopoverArrow,
} from '@chakra-ui/react';
import React, { useEffect, useReducer, useRef, useState } from 'react';
import useNotification from '@millicast-react/use-notification';
import useViewer, { SimulcastQuality, StreamQuality } from '@millicast-react/use-viewer';
import {
  IconProfile,
  IconInfo,
  IconSettings,
  IconCameraOn,
  IconCameraOff,
  IconSpeaker,
  IconSpeakerOff,
} from '@millicast-react/dolbyio-icons';
import VideoView from '@millicast-react/video-view';
import ParticipantCount from '@millicast-react/participant-count';
import Timer from '@millicast-react/timer';
import IconButton from '@millicast-react/icon-button';
import ActionBar from '@millicast-react/action-bar';
import Dropdown from '@millicast-react/dropdown';
import StatisticsInfo from '@millicast-react/statistics-info';
import InfoLabel from '@millicast-react/info-label';
import ControlBar from '@millicast-react/control-bar';

type StreamAttributes = { muteAudio: boolean; displayVideo: boolean; volume: number };

type StreamId = string;

type StreamsReducerState = Map<StreamId, StreamAttributes>;

enum StreamsActionType {
  ADD_STREAM = 'ADD_STREAM',
  TOGGLE_AUDIO = 'TOGGLE_AUDIO',
  TOGGLE_VIDEO = 'TOGGLE_VIDEO',
  ADJUST_VOLUME = 'ADJUST_VOLUME',
}

type StreamsAction =
  | {
      type: StreamsActionType.ADD_STREAM;
      id: string;
    }
  | {
      type: StreamsActionType.TOGGLE_AUDIO | StreamsActionType.TOGGLE_VIDEO;
      id: string;
    }
  | {
      type: StreamsActionType.ADJUST_VOLUME;
      id: string;
      value: number;
    };

const initialStreamAttributes: StreamAttributes = { muteAudio: true, displayVideo: true, volume: 0.5 };

const streamsReducer = (state: StreamsReducerState, action: StreamsAction) => {
  const prev = state.get(action.id);

  switch (action.type) {
    case StreamsActionType.ADD_STREAM: {
      const updated = new Map(state);
      updated.set(action.id, initialStreamAttributes);
      return updated;
    }
    case StreamsActionType.TOGGLE_AUDIO: {
      const updated = new Map(state);
      if (prev) {
        updated.set(action.id, { ...prev, muteAudio: !prev.muteAudio });
      }
      return updated;
    }
    case StreamsActionType.TOGGLE_VIDEO: {
      const updated = new Map(state);
      if (prev) {
        updated.set(action.id, { ...prev, displayVideo: !prev.displayVideo });
      }
      return updated;
    }
    case StreamsActionType.ADJUST_VOLUME: {
      const updated = new Map(state);
      if (prev) {
        updated.set(action.id, { ...prev, volume: action.value });
      }
      return updated;
    }
    default:
      console.error('Unknown action');
      return state;
  }
};

const Content = () => {
  const { showError } = useNotification();
  const [streamsAttributes, dispatch] = useReducer(streamsReducer, new Map());

  const {
    viewerState,
    mainStream,
    setupViewer,
    stopViewer,
    startViewer,
    remoteTrackSources,
    viewerCount,
    streamQualityOptions,
    updateStreamQuality,
    statistics,
  } = useViewer({ handleError: showError });

  const [selectedQuality, setSelectedQuality] = useState(streamQualityOptions[0]?.streamQuality);
  const projectingSourceId = useRef<string>('main');

  useEffect(() => {
    const href = new URL(window.location.href);
    const streamName = href.searchParams.get('streamName') ?? import.meta.env.VITE_MILLICAST_STREAM_NAME;
    const streamAccountId = href.searchParams.get('streamAccountId') ?? import.meta.env.VITE_MILLICAST_STREAM_ID;
    try {
      setupViewer(streamName, streamAccountId, projectingSourceId.current);
    } catch (err) {
      showError(`${err}`);
    }
    return () => {
      stopViewer();
    };
  }, []);

  useEffect(() => {
    if (viewerState === 'ready') {
      startViewer({ events: ['active', 'inactive', 'layers', 'viewercount'] });
    }
  }, [viewerState]);

  useEffect(() => {
    if (mainStream) {
      if (!streamsAttributes.has(mainStream.id)) {
        dispatch({ type: StreamsActionType.ADD_STREAM, id: mainStream.id });
      }
    }
    if (remoteTrackSources.size > 0) {
      Array.from(remoteTrackSources).forEach(([id]) => {
        if (!streamsAttributes.has(id)) {
          dispatch({ type: StreamsActionType.ADD_STREAM, id });
        }
      });
    }
  }, [mainStream, remoteTrackSources]);

  useEffect(() => {
    if (
      streamQualityOptions.length &&
      (!streamQualityOptions.some((options) => options.streamQuality === selectedQuality) ||
        streamQualityOptions.length === 1)
    ) {
      updateStreamQuality('Auto');
      setSelectedQuality('Auto');
    }
  }, [streamQualityOptions]);

  const isStreaming = viewerState === 'liveOn';
  const hasMultiStream = remoteTrackSources.size > 0;

  return (
    <Flex direction="column" minH="100vh" w="100vw" bg="background" p="6">
      <Box w="100%" h="94px">
        <ActionBar title="Company name" />
        <Flex w="100%" justifyContent="space-between" mt="4" position="relative" zIndex={1}>
          <Stack direction="column" spacing="4" alignItems="flex-start">
            <Flex alignItems="center">
              <Timer isActive={isStreaming} />
              {hasMultiStream && (
                <InfoLabel
                  text="Multi–stream view"
                  ml="2.5"
                  color="white"
                  bgColor="dolbyNeutral.300"
                  py="5px"
                  h="auto"
                  fontWeight="600"
                />
              )}
            </Flex>
          </Stack>
          <Stack direction="column" spacing="4" alignItems="flex-end">
            {isStreaming && viewerCount > 0 && <ParticipantCount count={viewerCount} />}
          </Stack>
        </Flex>
      </Box>
      <Flex flex={1} width="100%" alignItems="center" justifyContent="center">
        {!isStreaming ? (
          <VStack>
            <Heading test-id="getStartedInfoTitle" as="h2" fontSize="24px" fontWeight="600">
              Stream is not live
            </Heading>
            <Text>Please wait for livestream to begin.</Text>
          </VStack>
        ) : (
          <Stack direction="row" justifyContent="center" alignItems="center" w="100%" spacing="6">
            <>
              {mainStream &&
                (() => {
                  const { id } = mainStream;
                  const attributes = streamsAttributes.get(id);
                  return (
                    <Stack direction="column" justifyContent="center" alignItems="center" spacing={4}>
                      <VideoView
                        width={hasMultiStream ? '688px' : '836px'}
                        height={hasMultiStream ? '382px' : '464px'}
                        mediaStream={mainStream}
                        displayVideo={attributes?.displayVideo}
                        muted={attributes?.muteAudio}
                        displayMuteButton={true}
                        volume={attributes?.volume}
                        placeholderNode={
                          <Box color="dolbyNeutral.700" position="absolute" width="174px">
                            <IconProfile />
                          </Box>
                        }
                      />
                      <ControlBar
                        controls={[
                          {
                            key: 'volumeSlider',
                            'test-id': 'volumeSlider',
                            node: (
                              <Box>
                                <Popover trigger="hover" placement="top">
                                  <PopoverTrigger>
                                    <Box>
                                      <IconButton
                                        test-id="mainStreamAudioVolumeButton"
                                        icon={attributes?.muteAudio ? <IconSpeakerOff /> : <IconSpeaker />}
                                        isActive={attributes?.muteAudio}
                                        onClick={() => {
                                          dispatch({ type: StreamsActionType.TOGGLE_AUDIO, id });
                                        }}
                                      />
                                    </Box>
                                  </PopoverTrigger>
                                  {!attributes?.muteAudio && (
                                    <PopoverContent px={3} py={2.5} width="inherit">
                                      <PopoverArrow />
                                      <Flex justifyContent="center">
                                        <Slider
                                          value={attributes?.volume}
                                          min={0}
                                          step={0.1}
                                          max={1}
                                          orientation="vertical"
                                          h="90px"
                                          onChange={(value) =>
                                            dispatch({ type: StreamsActionType.ADJUST_VOLUME, id, value })
                                          }
                                        >
                                          <SliderTrack width="4px" h="90px" bg="dolbySecondary.200">
                                            <SliderFilledTrack bg="dolbyPurple.400" />
                                          </SliderTrack>
                                          <SliderThumb w="12px" h="12px" bg="dolbyNeutral.800" />
                                        </Slider>
                                      </Flex>
                                    </PopoverContent>
                                  )}
                                </Popover>
                              </Box>
                            ),
                          },
                          {
                            key: 'toggleMainStreamVideoButton',
                            'test-id': 'toggleMainStreamVideoButton',
                            tooltip: { label: 'Toggle Video', placement: 'top' },
                            onClick: () => {
                              dispatch({ type: StreamsActionType.TOGGLE_VIDEO, id });
                            },
                            isActive: !attributes?.displayVideo,
                            icon: attributes?.displayVideo ? <IconCameraOn /> : <IconCameraOff />,
                          },
                        ]}
                      />
                    </Stack>
                  );
                })()}

              {hasMultiStream && (
                <HStack spacing={4}>
                  {Array.from(remoteTrackSources).map(([id, source]) => {
                    if (id !== 'main') {
                      const attributes = streamsAttributes.get(id);
                      return (
                        <VStack key={id}>
                          <VideoView
                            width="688px"
                            height="382px"
                            mediaStream={source.mediaStream}
                            volume={attributes?.volume}
                            displayVideo={attributes?.displayVideo}
                            muted={attributes?.volume === 0}
                            displayMuteButton={true}
                          />
                          <ControlBar
                            controls={[
                              {
                                key: `volume${id}Slider`,
                                'test-id': `volume${id}Slider`,
                                node: (
                                  <Box>
                                    <Popover trigger="hover" placement="top">
                                      <PopoverTrigger>
                                        <Box>
                                          <IconButton
                                            test-id={`volume${id}SliderTrigger`}
                                            icon={attributes?.muteAudio ? <IconSpeakerOff /> : <IconSpeaker />}
                                            isActive={attributes?.muteAudio}
                                            onClick={() => {
                                              dispatch({ type: StreamsActionType.TOGGLE_AUDIO, id });
                                            }}
                                          />
                                        </Box>
                                      </PopoverTrigger>
                                      {!attributes?.muteAudio && (
                                        <PopoverContent px={3} py={2.5} maxW="max-content">
                                          <PopoverArrow />
                                          <Slider
                                            defaultValue={0}
                                            value={attributes?.volume}
                                            min={0}
                                            step={0.1}
                                            max={1}
                                            orientation="vertical"
                                            h="90px"
                                            onChange={(value) =>
                                              dispatch({ type: StreamsActionType.ADJUST_VOLUME, id: id, value })
                                            }
                                          >
                                            <SliderTrack width="4px" h="90px" bg="dolbySecondary.200">
                                              <SliderFilledTrack bg="dolbyPurple.400" />
                                            </SliderTrack>
                                            <SliderThumb w="12px" h="12px" bg="dolbyNeutral.800" />
                                          </Slider>
                                        </PopoverContent>
                                      )}
                                    </Popover>
                                  </Box>
                                ),
                              },
                              {
                                key: `toggle${id}VideoButton`,
                                'test-id': `toggle${id}VideoButton`,
                                tooltip: { label: 'Toggle Video', placement: 'top' },
                                onClick: () => {
                                  dispatch({ type: StreamsActionType.TOGGLE_VIDEO, id });
                                },
                                isActive: !attributes?.displayVideo,
                                icon: attributes?.displayVideo ? <IconCameraOn /> : <IconCameraOff />,
                              },
                            ]}
                          />
                        </VStack>
                      );
                    }
                    return null;
                  })}
                </HStack>
              )}
            </>
          </Stack>
        )}
      </Flex>
      <HStack alignItems="center" w="96%" h="48px" pos="fixed" bottom="32px">
        <Box>
          {isStreaming && statistics && (
            <Popover placement="top-end" closeOnBlur={false} closeOnEsc={false}>
              <PopoverTrigger>
                <Box>
                  <IconButton
                    test-id="streamInfoButton"
                    aria-label="Stream Information"
                    tooltip={{ label: 'Stream Information' }}
                    size="md"
                    className="icon-button"
                    icon={<IconInfo fill="white" />}
                    borderRadius="50%"
                    reversed
                  />
                </Box>
              </PopoverTrigger>
              <PopoverContent bg="dolbyNeutral.800" width="400px" border="none" p={6}>
                <PopoverHeader
                  color="white"
                  alignContent="flex-start"
                  border="none"
                  p={0}
                  fontSize="20px"
                  fontWeight="600"
                  mb={4}
                >
                  Streaming Information
                </PopoverHeader>
                <PopoverCloseButton fontSize="20px" color="white" top={4} right={4} />
                <PopoverBody p={0}>
                  <StatisticsInfo statistics={statistics} />
                </PopoverBody>
              </PopoverContent>
            </Popover>
          )}
        </Box>
        <Spacer />
        <Flex direction="row" gap={2} justifyContent="flex-end" alignItems="center">
          {isStreaming && (
            <Popover placement="top-end">
              <PopoverTrigger>
                <Box>
                  <IconButton
                    test-id="settingsButton"
                    tooltip={{ label: 'Settings' }}
                    icon={<IconSettings />}
                    borderRadius="50%"
                    reversed
                  />
                </Box>
              </PopoverTrigger>
              <PopoverContent bg="dolbyNeutral.800" width="364px" border="none" p={6}>
                <PopoverHeader
                  color="white"
                  alignContent="flex-start"
                  border="none"
                  p={0}
                  fontSize="20px"
                  fontWeight="600"
                  mb={4}
                >
                  Settings
                </PopoverHeader>
                <PopoverCloseButton fontSize="20px" color="white" top={4} right={4} />
                <PopoverBody p={0}>
                  <Dropdown
                    leftIcon={<IconCameraOn />}
                    testId="quality-select"
                    elementsList={streamQualityOptions}
                    elementResolver={(element) => {
                      const quality = element as SimulcastQuality;
                      return {
                        id: quality.streamQuality,
                        label: quality.streamQuality,
                        data: quality.streamQuality,
                      };
                    }}
                    onSelect={(data) => {
                      updateStreamQuality(data as StreamQuality);
                      setSelectedQuality(data as StreamQuality);
                    }}
                    selected={selectedQuality}
                    placeholder="Video quality"
                    disabled={streamQualityOptions.length < 2}
                  />
                </PopoverBody>
              </PopoverContent>
            </Popover>
          )}
        </Flex>
      </HStack>
      <Box test-id="appVersion" position="fixed" bottom="5px" left="5px">
        <Text fontSize="12px">Version: {__APP_VERSION__} </Text>
      </Box>
    </Flex>
  );
};

export default Content;
