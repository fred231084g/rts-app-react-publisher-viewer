import { Box, useDisclosure } from '@chakra-ui/react';
import React from 'react';

import { IconSettings } from '@millicast-react/dolbyio-icons';
import IconButton from '@millicast-react/icon-button';
import StatisticsPopover from '@millicast-react/statistics-popover';
import VideoView from '@millicast-react/video-view';

import { PublisherVideoViewProps } from './types';
import VideoSettingsDrawer from './video-settings-drawer';

const PublisherVideoView = ({ isActive, settingsProps, statistics, videoProps }: PublisherVideoViewProps) => {
  const { onClose: handleSettingsClose, onOpen: handleSettingsOpen, isOpen: isSettingsOpen } = useDisclosure();

  const { mediaStream } = videoProps;

  return (
    <Box height="100%" overflow="hidden" margin="0 auto" position="relative" width="100%">
      <VideoView {...videoProps} />
      {isActive && statistics ? (
        <Box bottom="12px" left="18px" position="absolute">
          <StatisticsPopover statistics={statistics} />
        </Box>
      ) : undefined}
      <IconButton
        background="transparent"
        bottom="12px"
        icon={<IconSettings />}
        isDisabled={!(mediaStream && mediaStream.getVideoTracks().length)}
        isRound
        onClick={handleSettingsOpen}
        position="absolute"
        right="18px"
        reversed
        size="sm"
        testId="settingsOpenButton"
        tooltipProps={{ label: 'Settings' }}
      />
      {settingsProps ? (
        <VideoSettingsDrawer isOpen={isSettingsOpen} onClose={handleSettingsClose} {...settingsProps} />
      ) : undefined}
    </Box>
  );
};

export * from './types';
export default PublisherVideoView;
