/* eslint-disable no-unused-vars */
import { useColorModeValue } from '@chakra-ui/react';
import { When, Then } from '@cucumber/cucumber';
import { StreamView } from '../pages/components/StreamView';

import { getPageObject } from '../pages/PageUtils';
import { ScenarioWorld } from '../support/ScenarioWorld';

When(
  /^the publisher turns (Off|On) the video view camera on the (Preview|Stream) page$/,
  async function (this: ScenarioWorld, status, pageName) {
    const pageObject = getPageObject(this, `Publisher${pageName}Page`);
    await pageObject.getStreamView().toggleVideoViewCamera(status);
  }
);

When(
  /^the publisher turns (Off|On) the video view microphone on the (Preview|Stream) page$/,
  async function (this: ScenarioWorld, status, pageName) {
    const pageObject = getPageObject(this, `Publisher${pageName}Page`);
    await pageObject.getStreamView().toggleVideoViewMicrophone(status);
  }
);

When(
  /^the publisher clicks on (full|normal) screen button of the main view on the (Preview|Stream) page$/,
  async function (this: ScenarioWorld, screen, pageName) {
    const pageObject = getPageObject(this, `Publisher${pageName}Page`);
    await pageObject.toggleFullScreenMainStreamView(screen);
  }
);

When(
  /^the publisher (Starts|Stops) screen sharing on the (Preview|Stream) page$/,
  async function (this: ScenarioWorld, action, pageName) {
    const pageObject = getPageObject(this, `Publisher${pageName}Page`);
    await pageObject.toggleScreenShare(action);
  }
);

When(
  /^the publisher clicks on the add source button on the (Preview|Stream) page$/,
  async function (this: ScenarioWorld, pageName) {
    const pageObject = getPageObject(this, `Publisher${pageName}Page`);
    await pageObject.getAddSource().openAddSourceMenu();
  }
);

When(
  /^the publisher clicks on the share screen button on the (Preview|Stream) page$/,
  async function (this: ScenarioWorld, pageName) {
    const pageObject = getPageObject(this, `Publisher${pageName}Page`);
    await pageObject.getAddSource().shareScreen();
  }
);

When(
  /^the publisher clicks on the stop screen share button on the (Preview|Stream) page$/,
  async function (this: ScenarioWorld, pageName) {
    const pageObject = getPageObject(this, `Publisher${pageName}Page`);
    await pageObject.getStreamView().stopScreenShare();
  }
);

When(
  /^the publisher clicks on the setting button on the (Preview|Stream) page$/,
  async function (this: ScenarioWorld, pageName) {
    const pageObject = getPageObject(this, `Publisher${pageName}Page`);
    await pageObject.getSetting().openSettingDrawer();
  }
);

Then(/^the publisher should be navigated to (Preview|Stream) page$/, async function (this: ScenarioWorld, pageName) {
  const pageObject = getPageObject(this, `Publisher${pageName}Page`);
  await pageObject.waitForPageLoad();
});

Then(
  /^on the publisher (Preview|Stream) page streaming state should be (visible|hidden|enabled|disabled)$/,
  async function (this: ScenarioWorld, pageName, state) {
    const pageObject = getPageObject(this, `Publisher${pageName}Page`);
    await pageObject.verifyStreamingLblState(state);
  }
);

Then(
  /^on the publisher (Preview|Stream) page multi source lbl should be (visible|hidden|enabled|disabled)$/,
  async function (this: ScenarioWorld, pageName, state) {
    const pageObject = getPageObject(this, `Publisher${pageName}Page`);
    await pageObject.getHeaderFooter().verifyMultiSourceLblState(state);
  }
);

Then(
  /^on the publisher (Preview|Stream) page company name should be (visible|hidden|enabled|disabled)$/,
  async function (this: ScenarioWorld, pageName, state) {
    const pageObject = getPageObject(this, `Publisher${pageName}Page`);
    await pageObject.verifyCompanyNameLblState(state);
  }
);

Then(
  /^on the publisher (Preview|Stream) page stream time should be (visible|hidden|enabled|disabled)$/,
  async function (this: ScenarioWorld, pageName, state) {
    const pageObject = getPageObject(this, `Publisher${pageName}Page`);
    await pageObject.verifyStreamingTimeLblState(state);
  }
);

Then(
  /^on the publisher (Preview|Stream) page video view microphone button should be (visible|hidden|enabled|disabled)$/,
  async function (this: ScenarioWorld, pageName, buttonState) {
    const pageObject = getPageObject(this, `Publisher${pageName}Page`);
    const streamView: StreamView = pageObject.getStreamView();
    await streamView.verifyVideoViewMicrophoneBtnState(buttonState);
  }
);

Then(
  /^on the publisher (Preview|Stream) page video view camera button should be (visible|hidden|enabled|disabled)$/,
  async function (this: ScenarioWorld, pageName, buttonState) {
    const pageObject = getPageObject(this, `Publisher${pageName}Page`);
    await pageObject.getStreamView().verifyVideoViewCameraBtnState(buttonState);
  }
);

Then(
  /^on the publisher (Preview|Stream) page add source button should be (visible|hidden|enabled|disabled)$/,
  async function (this: ScenarioWorld, pageName, buttonState) {
    const pageObject = getPageObject(this, `Publisher${pageName}Page`);
    await pageObject.getAddSource().verifyAddSourceBtnState(buttonState);
  }
);

Then(
  /^on the publisher (Preview|Stream) page share button should be (visible|hidden|enabled|disabled)$/,
  async function (this: ScenarioWorld, pageName, buttonState) {
    const pageObject = getPageObject(this, `Publisher${pageName}Page`);
    await pageObject.verifyShareBtnState(buttonState);
  }
);

Then(
  /^on the publisher (Preview|Stream) page setting button should be (visible|hidden|enabled|disabled)$/,
  async function (this: ScenarioWorld, pageName, buttonState) {
    const pageObject = getPageObject(this, `Publisher${pageName}Page`);
    await pageObject.getSetting().verifySettingBtnState(buttonState);
  }
);

Then(
  /^on the publisher (Preview|Stream) page invite button should be (visible|hidden|enabled|disabled)$/,
  async function (this: ScenarioWorld, pageName, buttonState) {
    const pageObject = getPageObject(this, `Publisher${pageName}Page`);
    await pageObject.getHeaderFooter().verifyInviteBtnState(buttonState);
  }
);

Then(
  /^on the publisher (Preview|Stream) page stream info button should be (visible|hidden|enabled|disabled)$/,
  async function (this: ScenarioWorld, pageName, buttonState) {
    const pageObject = getPageObject(this, `Publisher${pageName}Page`);
    await pageObject.getStreamStats().verifyStreamInfoBtnState(buttonState);
  }
);

Then(
  /^on the publisher (Preview|Stream) page video view should be (visible|hidden|enabled|disabled)$/,
  async function (this: ScenarioWorld, pageName, buttonState) {
    const pageObject = getPageObject(this, `Publisher${pageName}Page`);
    await pageObject.getStreamView().verifyVideoViewState(buttonState);
  }
);

Then(
  /^on the publisher (Preview|Stream) page screen view should be (visible|hidden|enabled|disabled)$/,
  async function (this: ScenarioWorld, pageName, buttonState) {
    const pageObject = getPageObject(this, `Publisher${pageName}Page`);
    await pageObject.getStreamView().verifyScreenViewState(buttonState);
  }
);

Then(
  /^on the publisher (Preview|Stream) page inside video view full screen button should be (visible|hidden|enabled|disabled)$/,
  async function (this: ScenarioWorld, pageName, buttonState) {
    const pageObject = getPageObject(this, `Publisher${pageName}Page`);
    await pageObject.getStreamView().verifyVideoViewFullScreenBtnState(buttonState);
  }
);

Then(
  /^on the publisher (Preview|Stream) page inside screen view full screen button should be (visible|hidden|enabled|disabled)$/,
  async function (this: ScenarioWorld, pageName, buttonState) {
    const pageObject = getPageObject(this, `Publisher${pageName}Page`);
    await pageObject.getStreamView().verifyScreenViewFullScreenBtnState(buttonState);
  }
);

Then(
  /^on the publisher (Preview|Stream) page streaming state dot should be (visible|hidden|enabled|disabled)$/,
  async function (this: ScenarioWorld, pageName, buttonState) {
    const pageObject = getPageObject(this, `Publisher${pageName}Page`);
    await pageObject.getHeaderFooter().verifyStreamingDotLblState(buttonState);
  }
);

Then(
  /^on the publisher (Preview|Stream) page share screen button should be (visible|hidden|enabled|disabled)$/,
  async function (this: ScenarioWorld, pageName, buttonState) {
    const pageObject = getPageObject(this, `Publisher${pageName}Page`);
    await pageObject.getAddSource().verifyShareScreenBtnState(buttonState);
  }
);

Then(
  /^on the publisher (Preview|Stream) page inside screen view stop screen share button should be (visible|hidden|enabled|disabled)$/,
  async function (this: ScenarioWorld, pageName, buttonState) {
    const pageObject = getPageObject(this, `Publisher${pageName}Page`);
    await pageObject.getStreamView().verifyStopScreenShareBtnState(buttonState);
  }
);

Then(
  /^on the publisher (Preview|Stream) page settings drawer should be (visible|hidden|enabled|disabled)$/,
  async function (this: ScenarioWorld, pageName, state) {
    const pageObject = getPageObject(this, `Publisher${pageName}Page`);
    await pageObject.getSetting().verifySettingDrawerState(state);
  }
);


Then(
  /^on the publisher (Preview|Stream) page camera dropdown should be (visible|hidden|enabled|disabled)$/,
  async function (this: ScenarioWorld, pageName, state) {
    const pageObject = getPageObject(this, `Publisher${pageName}Page`);
    await pageObject.getSetting().verifyCameraDropdownState(state);
  }
);

Then(
  /^on the publisher (Preview|Stream) page microphone dropdown should be (visible|hidden|enabled|disabled)$/,
  async function (this: ScenarioWorld, pageName, state) {
    const pageObject = getPageObject(this, `Publisher${pageName}Page`);
    await pageObject.getSetting().verifyMicrophoneDropdownState(state);
  }
);

Then(
  /^on the publisher (Preview|Stream) page resolution dropdown should be (visible|hidden|enabled|disabled)$/,
  async function (this: ScenarioWorld, pageName, state) {
    const pageObject = getPageObject(this, `Publisher${pageName}Page`);
    await pageObject.getSetting().verifyResolutionDropdownState(state);
  }
);

Then(
  /^on the publisher (Preview|Stream) page codec dropdown should be (visible|hidden|enabled|disabled)$/,
  async function (this: ScenarioWorld, pageName, state) {
    const pageObject = getPageObject(this, `Publisher${pageName}Page`);
    await pageObject.getSetting().verifyCodecDropdownState(state);
  }
);

Then(
  /^on the publisher (Preview|Stream) page codec bitrate should be (visible|hidden|enabled|disabled)$/,
  async function (this: ScenarioWorld, pageName, state) {
    const pageObject = getPageObject(this, `Publisher${pageName}Page`);
    await pageObject.getSetting().verifyBitrateDropdownState(state);
  }
);

Then(
  /^on the publisher (Preview|Stream) page streaming state value should be "([^"]*)"$/,
  async function (this: ScenarioWorld, pageName, value) {
    const pageObject = getPageObject(this, `Publisher${pageName}Page`);
    await pageObject.verifyStreamingStatus(value);
  }
);

Then(
  /^on the publisher (Preview|Stream) page multi source lbl value should be "([^"]*)"$/,
  async function (this: ScenarioWorld, pageName, value) {
    const pageObject = getPageObject(this, `Publisher${pageName}Page`);
    await pageObject.getHeaderFooter().verifyMultiSource(value);
  }
);

Then(
  /^on the publisher (Preview|Stream) page company name value should be "([^"]*)"$/,
  async function (this: ScenarioWorld, pageName, value) {
    const pageObject = getPageObject(this, `Publisher${pageName}Page`);
    await pageObject.getHeaderFooter().verifyCompanyName(value);
  }
);

Then(
  /^on the publisher (Preview|Stream) page stream time value should be "([^"]*)"$/,
  async function (this: ScenarioWorld, pageName, value) {
    const pageObject = getPageObject(this, `Publisher${pageName}Page`);
    await pageObject.getHeaderFooter().verifyTimer(value);
  }
);

Then(
  /^on the publisher (Preview|Stream) page inside video view source name label value should be "([^"]*)"$/,
  async function (this: ScenarioWorld, pageName, value) {
    const pageObject = getPageObject(this, `Publisher${pageName}Page`);
    await pageObject.getStreamView().verifyVideoViewSourceName(value);
  }
);


Then(
  /^on the publisher (Preview|Stream) page inside screen view source name label value should be "([^"]*)"$/,
  async function (this: ScenarioWorld, pageName, value) {
    const pageObject = getPageObject(this, `Publisher${pageName}Page`);
    await pageObject.getStreamView().verifyScreenViewSourceName(value);
  }
);

Then(
  /^on the publisher (Preview|Stream) page video view camera should be turned (On|Off)$/,
  async function (this: ScenarioWorld, pageName, status) {
    const pageObject = getPageObject(this, `Publisher${pageName}Page`);
    await pageObject.getStreamView().verifyVideoViewCameraStatus(status);
  }
);

Then(
  /^on the publisher (Preview|Stream) page video view microphone should be turned (On|Off)$/,
  async function (this: ScenarioWorld, pageName, status) {
    const pageObject = getPageObject(this, `Publisher${pageName}Page`);
    await pageObject.getStreamView().verifyVideoViewMicrophoneStatus(status);
  }
);

Then(
  /^on the publisher (Preview|Stream) page main view size should be (full|normal) size$/,
  async function (this: ScenarioWorld, pageName, screen) {
    const pageObject = getPageObject(this, `Publisher${pageName}Page`);
    await pageObject.verifyMainStreamViewFullScreen(screen);
  }
);

Then(
  /^on the publisher (Preview) page add source button text should be "([^"]*)"$/,
  async function (this: ScenarioWorld, pageName, value) {
    const pageObject = getPageObject(this, `Publisher${pageName}Page`);
    await pageObject.getAddSource().verifyAddSourceBtnText(value);
  }
);

Then(
  /^on the publisher (Preview) page settings drawer title value should be "([^"]*)"$/,
  async function (this: ScenarioWorld, pageName, value) {
    const pageObject = getPageObject(this, `Publisher${pageName}Page`);
    await pageObject.getSetting().verifySettingDrawerTitle(value);
  }
);

Then(
  /^on the publisher (Preview) page settings drawer dropdown count should be "([^"]*)"$/,
  async function (this: ScenarioWorld, pageName, value: string) {
    const pageObject = getPageObject(this, `Publisher${pageName}Page`);
    await pageObject.getSetting().verifyDropdownCount(Number(value));
  }
);

Then(
  /^on the publisher (Preview|Stream) page add source should contain "([^"]*)" options$/,
  async function (this: ScenarioWorld, pageName, options: string) {
    const pageObject = getPageObject(this, `Publisher${pageName}Page`);
    await pageObject.getAddSource().verifySubMenu(options.split(','));
  }
);

Then(
  /^on the publisher (Preview|Stream) page camera dropdown should contain "([^"]*)" options$/,
  async function (this: ScenarioWorld, pageName, options: string) {
    const pageObject = getPageObject(this, `Publisher${pageName}Page`);
    await pageObject.getSetting().verifyCameraDropdownOptions(options.split(','));
  }
);

Then(
  /^on the publisher (Preview|Stream) page microphone dropdown should contain "([^"]*)" options$/,
  async function (this: ScenarioWorld, pageName, options: string) {
    const pageObject = getPageObject(this, `Publisher${pageName}Page`);
    await pageObject.getSetting().verifyMicrophoneDropdownOptions(options.split(','));
  }
);

Then(
  /^on the publisher (Preview|Stream) page resolution dropdown should contain "([^"]*)" options$/,
  async function (this: ScenarioWorld, pageName, options: string) {
    const pageObject = getPageObject(this, `Publisher${pageName}Page`);
    await pageObject.getSetting().verifyResolutionDropdownOptions(options.split(','));
  }
);

Then(
  /^on the publisher (Preview|Stream) page codec dropdown should contain "([^"]*)" options$/,
  async function (this: ScenarioWorld, pageName, options: string) {
    const pageObject = getPageObject(this, `Publisher${pageName}Page`);
    await pageObject.getSetting().verifyCodecDropdownOptions(options.split(','));
  }
);

Then(
  /^on the publisher (Preview|Stream) page bitrate dropdown should contain "([^"]*)" options$/,
  async function (this: ScenarioWorld, pageName, options: string) {
    const pageObject = getPageObject(this, `Publisher${pageName}Page`);
    await pageObject.getSetting().verifyBitrateDropdownOptions(options.split(','));
  }
);