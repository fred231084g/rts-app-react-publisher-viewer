/* eslint-disable no-unused-vars */
import { When, Then } from '@cucumber/cucumber';
import { StreamView } from '../pages/components/StreamView';

import { getPageObject } from '../pages/PageUtils';
import { ScenarioWorld } from '../support/ScenarioWorld';

When(
  /^the (publisher|viewer) turns (Off|On) the video view camera on the (Preview|Stream) page$/,
  async function (this: ScenarioWorld, actor, status, pageName) {
    const pageObject = getPageObject(this, `${actor}${pageName}Page`);
    await pageObject.getStreamView().toggleVideoViewCamera(status);
  }
);

When(
  /^the (publisher|viewer) turns (Off|On) the video view microphone on the (Preview|Stream) page$/,
  async function (this: ScenarioWorld, actor, status, pageName) {
    const pageObject = getPageObject(this, `${actor}${pageName}Page`);
    await pageObject.getStreamView().toggleVideoViewMicrophone(status);
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

Then(/^the (publisher|viewer) should be navigated to (Preview|Stream|Waiting Room) page$/, async function (this: ScenarioWorld, actor, pageName) {
  const pageObject = getPageObject(this, `${actor}${pageName}Page`);
  await pageObject.waitForPageLoad();
});


Then(
  /^on the (publisher|viewer) (Preview|Stream|Waiting Room) page multi source label should be (visible|hidden|enabled|disabled)$/,
  async function (this: ScenarioWorld, actor, pageName, state) {
    const pageObject = getPageObject(this, `${actor}${pageName}Page`);
    await pageObject.getHeaderFooter().verifyMultiSourceLblState(state);
  }
);

Then(
  /^on the (publisher|viewer) (Preview|Stream|Waiting Room) page company name should be (visible|hidden|enabled|disabled)$/,
  async function (this: ScenarioWorld, actor, pageName, state) {
    const pageObject = getPageObject(this, `${actor}${pageName}Page`);
    await pageObject.getHeaderFooter().verifyCompanyNameLblState(state);
  }
);

Then(
  /^on the (publisher|viewer) (Preview|Stream|Waiting Room) page stream time should be (visible|hidden|enabled|disabled)$/,
  async function (this: ScenarioWorld, pageName, state) {
    const pageObject = getPageObject(this, `Publisher${pageName}Page`);
    await pageObject.getHeaderFooter().verifyStreamingTimeLblState(state);
  }
);

Then(
  /^on the (publisher|viewer) (Preview|Stream|Waiting Room) page heading should be (visible|hidden|enabled|disabled)$/,
  async function (this: ScenarioWorld, actor, pageName, state) {
    const pageObject = getPageObject(this, `${actor}${pageName}Page`);
    await pageObject.getHeaderFooter().verifyHeaderLblState(state);
  }
);

Then(
  /^on the (publisher|viewer) (Preview|Stream|Waiting Room) page description should be (visible|hidden|enabled|disabled)$/,
  async function (this: ScenarioWorld, actor, pageName, state) {
    const pageObject = getPageObject(this, `${actor}${pageName}Page`);
    await pageObject.getHeaderFooter().verifyDescriptionLblState(state);
  }
);

Then(
  /^on the (publisher|viewer) (Preview|Stream|Waiting Room) page video view microphone button should be (visible|hidden|enabled|disabled)$/,
  async function (this: ScenarioWorld, actor, pageName, buttonState) {
    const pageObject = getPageObject(this, `${actor}${pageName}Page`);
    const streamView: StreamView = pageObject.getStreamView();
    await streamView.verifyVideoViewMicrophoneBtnState(buttonState);
  }
);

Then(
  /^on the (publisher|viewer) (Preview|Stream|Waiting Room) page video view camera button should be (visible|hidden|enabled|disabled)$/,
  async function (this: ScenarioWorld, actor, pageName, buttonState) {
    const pageObject = getPageObject(this, `${actor}${pageName}Page`);
    await pageObject.getStreamView().verifyVideoViewCameraBtnState(buttonState);
  }
);

Then(
  /^on the (publisher|viewer) (Preview|Stream|Waiting Room) page add source button should be (visible|hidden|enabled|disabled)$/,
  async function (this: ScenarioWorld, actor, pageName, buttonState) {
    const pageObject = getPageObject(this, `${actor}${pageName}Page`);
    await pageObject.getAddSource().verifyAddSourceBtnState(buttonState);
  }
);

Then(
  /^on the (publisher|viewer) (Preview|Stream|Waiting Room) page setting button should be (visible|hidden|enabled|disabled)$/,
  async function (this: ScenarioWorld, actor, pageName, buttonState) {
    const pageObject = getPageObject(this, `${actor}${pageName}Page`);
    await pageObject.getSetting().verifySettingBtnState(buttonState);
  }
);

Then(
  /^on the (publisher|viewer) (Preview|Stream|Waiting Room) page invite button should be (visible|hidden|enabled|disabled)$/,
  async function (this: ScenarioWorld, actor, pageName, buttonState) {
    const pageObject = getPageObject(this, `${actor}${pageName}Page`);
    await pageObject.getHeaderFooter().verifyInviteBtnState(buttonState);
  }
);

Then(
  /^on the (publisher|viewer) (Preview|Stream|Waiting Room) page stream info button should be (visible|hidden|enabled|disabled)$/,
  async function (this: ScenarioWorld, actor, pageName, buttonState) {
    const pageObject = getPageObject(this, `${actor}${pageName}Page`);
    await pageObject.getStreamStats().verifyStreamInfoBtnState(buttonState);
  }
);

Then(
  /^on the (publisher|viewer) (Preview|Stream|Waiting Room) page video view should be (visible|hidden|enabled|disabled)$/,
  async function (this: ScenarioWorld, actor, pageName, buttonState) {
    const pageObject = getPageObject(this, `${actor}${pageName}Page`);
    await pageObject.getStreamView().verifyVideoViewState(buttonState);
  }
);

Then(
  /^on the (publisher|viewer) (Preview|Stream|Waiting Room) page screen view should be (visible|hidden|enabled|disabled)$/,
  async function (this: ScenarioWorld, actor, pageName, buttonState) {
    const pageObject = getPageObject(this, `${actor}${pageName}Page`);
    await pageObject.getStreamView().verifyScreenViewState(buttonState);
  }
);

Then(
  /^on the (publisher|viewer) (Preview|Stream) page video view full screen button should be (visible|hidden|enabled|disabled)$/,
  async function (this: ScenarioWorld, actor, pageName, buttonState) {
    const pageObject = getPageObject(this, `${actor}${pageName}Page`);
    await pageObject.getStreamView().verifyVideoViewFullScreenBtnState(buttonState);
  }
);

Then(
  /^on the (publisher|viewer) (Preview|Stream) page screen view full screen button should be (visible|hidden|enabled|disabled)$/,
  async function (this: ScenarioWorld, actor, pageName, buttonState) {
    const pageObject = getPageObject(this, `${actor}${pageName}Page`);
    await pageObject.getStreamView().verifyScreenViewFullScreenBtnState(buttonState);
  }
);

Then(
  /^on the (publisher|viewer) (Preview|Stream|Waiting Room) page streaming state dot should be (visible|hidden|enabled|disabled)$/,
  async function (this: ScenarioWorld, actor, pageName, buttonState) {
    const pageObject = getPageObject(this, `${actor}${pageName}Page`);
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
  /^on the (publisher|viewer) (Preview|Stream|Waiting Room) page screen view stop screen share button should be (visible|hidden|enabled|disabled)$/,
  async function (this: ScenarioWorld, actor, pageName, buttonState) {
    const pageObject = getPageObject(this, `${actor}${pageName}Page`);
    await pageObject.getStreamView().verifyStopScreenShareBtnState(buttonState);
  }
);

Then(
  /^on the (publisher|viewer) (Preview|Stream) page settings drawer should be (visible|hidden|enabled|disabled)$/,
  async function (this: ScenarioWorld, actor, pageName, state) {
    const pageObject = getPageObject(this, `${actor}${pageName}Page`);
    await pageObject.getSetting().verifySettingDrawerState(state);
  }
);


Then(
  /^on the (publisher|viewer) (Preview|Stream) page camera dropdown should be (visible|hidden|enabled|disabled)$/,
  async function (this: ScenarioWorld, actor, pageName, state) {
    const pageObject = getPageObject(this, `${actor}${pageName}Page`);
    await pageObject.getSetting().verifyCameraDropdownState(state);
  }
);

Then(
  /^on the (publisher|viewer) (Preview|Stream) page microphone dropdown should be (visible|hidden|enabled|disabled)$/,
  async function (this: ScenarioWorld, actor, pageName, state) {
    const pageObject = getPageObject(this, `${actor}${pageName}Page`);
    await pageObject.getSetting().verifyMicrophoneDropdownState(state);
  }
);

Then(
  /^on the (publisher|viewer) (Preview|Stream) page resolution dropdown should be (visible|hidden|enabled|disabled)$/,
  async function (this: ScenarioWorld, actor, pageName, state) {
    const pageObject = getPageObject(this, `${actor}${pageName}Page`);
    await pageObject.getSetting().verifyResolutionDropdownState(state);
  }
);

Then(
  /^on the (publisher|viewer) (Preview|Stream) page codec dropdown should be (visible|hidden|enabled|disabled)$/,
  async function (this: ScenarioWorld, actor, pageName, state) {
    const pageObject = getPageObject(this, `${actor}${pageName}Page`);
    await pageObject.getSetting().verifyCodecDropdownState(state);
  }
);

Then(
  /^on the (publisher|viewer) (Preview|Stream) page bitrate dropdown should be (visible|hidden|enabled|disabled)$/,
  async function (this: ScenarioWorld, actor, pageName, state) {
    const pageObject = getPageObject(this, `${actor}${pageName}Page`);
    await pageObject.getSetting().verifyBitrateDropdownState(state);
  }
);

Then(
  /^on the (publisher|viewer) (Preview|Stream|Waiting Room) page viewer count should be (visible|hidden|enabled|disabled)$/,
  async function (this: ScenarioWorld, actor, pageName, state) {
    const pageObject = getPageObject(this, `${actor}${pageName}Page`);
    await pageObject.getHeaderFooter().verifyViewersCountState(state);
  }
);


Then(
  /^on the (publisher|viewer) (Preview|Stream) page multi source label value should be "([^"]*)"$/,
  async function (this: ScenarioWorld, actor, pageName, value) {
    const pageObject = getPageObject(this, `${actor}${pageName}Page`);
    await pageObject.getHeaderFooter().verifyMultiSource(value);
  }
);

Then(
  /^on the (publisher|viewer) (Preview|Stream|Waiting Room) page company name value should be "([^"]*)"$/,
  async function (this: ScenarioWorld, actor, pageName, value) {
    const pageObject = getPageObject(this, `${actor}${pageName}Page`);
    await pageObject.getHeaderFooter().verifyCompanyName(value);
  }
);

Then(
  /^on the (publisher|viewer) (Preview|Stream|Waiting Room) page stream time value should be "([^"]*)"$/,
  async function (this: ScenarioWorld, actor, pageName, value) {
    const pageObject = getPageObject(this, `${actor}${pageName}Page`);
    await pageObject.getHeaderFooter().verifyTimer(value);
  }
);

Then(
  /^on the (publisher|viewer) (Preview|Waiting Room) page heading value should be "([^"]*)"$/,
  async function (this: ScenarioWorld, actor, pageName, value) {
    const pageObject = getPageObject(this, `${actor}${pageName}Page`);
    await pageObject.getHeaderFooter().verifyGetStartedHeader(value);
  }
);

Then(
  /^on the (publisher|viewer) (Preview|Waiting Room) page description value should be "([^"]*)"$/,
  async function (this: ScenarioWorld, actor, pageName, value) {
    const pageObject = getPageObject(this, `${actor}${pageName}Page`);
    await pageObject.getHeaderFooter().verifyGetStartedDesc(value);
  }
);

Then(
  /^on the (publisher|viewer) (Preview|Stream) page video view source name label value should be "([^"]*)"$/,
  async function (this: ScenarioWorld, actor, pageName, value) {
    const pageObject = getPageObject(this, `${actor}${pageName}Page`);
    await pageObject.getStreamView().verifyVideoViewSourceName(value);
  }
);


Then(
  /^on the (publisher|viewer) (Preview|Stream) page screen view source name label value should be "([^"]*)"$/,
  async function (this: ScenarioWorld, actor, pageName, value) {
    const pageObject = getPageObject(this, `${actor}${pageName}Page`);
    await pageObject.getStreamView().verifyScreenViewSourceName(value);
  }
);

Then(
  /^on the (publisher|viewer) (Preview|Stream) page video view camera should be turned (On|Off)$/,
  async function (this: ScenarioWorld, actor, pageName, status) {
    const pageObject = getPageObject(this, `${actor}${pageName}Page`);
    await pageObject.getStreamView().verifyVideoViewCameraStatus(status);
  }
);

Then(
  /^on the (publisher|viewer) (Preview|Stream) page video view microphone should be turned (On|Off)$/,
  async function (this: ScenarioWorld, actor, pageName, status) {
    const pageObject = getPageObject(this, `${actor}${pageName}Page`);
    await pageObject.getStreamView().verifyVideoViewMicrophoneStatus(status);
  }
);

Then(
  /^on the (publisher|viewer) (Preview|Stream) page video view should be in (full|normal) size$/,
  async function (this: ScenarioWorld, actor, pageName, screen) {
    const pageObject = getPageObject(this, `${actor}${pageName}Page`);
    await pageObject.getStreamView().verifyVideoViewFullScreen(screen)
  }
);

Then(
  /^on the (publisher|viewer) (Preview|Stream) page screen view should be in (full|normal) size$/,
  async function (this: ScenarioWorld, actor, pageName, screen) {
    const pageObject = getPageObject(this, `${actor}${pageName}Page`);
    await pageObject.getStreamView().verifyStreamViewFullScreen(screen)
  }
);

Then(
  /^on the publisher (Preview|Stream) page add source button text should be "([^"]*)"$/,
  async function (this: ScenarioWorld, pageName, value) {
    const pageObject = getPageObject(this, `Publisher${pageName}Page`);
    await pageObject.getAddSource().verifyAddSourceBtnText(value);
  }
);

Then(
  /^on the (publisher|viewer) (Preview|Stream) page settings drawer title value should be "([^"]*)"$/,
  async function (this: ScenarioWorld, actor, pageName, value) {
    const pageObject = getPageObject(this, `${actor}${pageName}Page`);
    await pageObject.getSetting().verifySettingDrawerTitle(value);
  }
);

Then(
  /^on the (publisher|viewer) (Preview|Stream) page settings drawer dropdown count should be "([^"]*)"$/,
  async function (this: ScenarioWorld, actor, pageName, value: string) {
    const pageObject = getPageObject(this, `${actor}${pageName}Page`);
    await pageObject.getSetting().verifyDropdownCount(Number(value));
  }
);

Then(
  /^on the (publisher) (Preview|Stream) page add source should contain "([^"]*)" options$/,
  async function (this: ScenarioWorld, actor, pageName, options: string) {
    const pageObject = getPageObject(this, `${actor}${pageName}Page`);
    await pageObject.getAddSource().verifySubMenu(options.split(','));
  }
);

Then(
  /^on the (publisher) (Preview|Stream) page camera dropdown should contain "([^"]*)" options$/,
  async function (this: ScenarioWorld, actor, pageName, options: string) {
    const pageObject = getPageObject(this, `${actor}${pageName}Page`);
    await pageObject.getSetting().verifyCameraDropdownOptions(options.split(','));
  }
);

Then(
  /^on the (publisher) (Preview|Stream) page microphone dropdown should contain "([^"]*)" options$/,
  async function (this: ScenarioWorld, actor, pageName, options: string) {
    const pageObject = getPageObject(this, `${actor}${pageName}Page`);
    await pageObject.getSetting().verifyMicrophoneDropdownOptions(options.split(','));
  }
);

Then(
  /^on the (publisher) (Preview|Stream) page resolution dropdown should contain "([^"]*)" options$/,
  async function (this: ScenarioWorld, actor, pageName, options: string) {
    const pageObject = getPageObject(this, `${actor}${pageName}Page`);
    await pageObject.getSetting().verifyResolutionDropdownOptions(options.split(','));
  }
);

Then(
  /^on the (publisher) (Preview|Stream) page codec dropdown selected value should be "([^"]*)"$/,
  async function (this: ScenarioWorld, actor, pageName, value: string) {
    const pageObject = getPageObject(this, `${actor}${pageName}Page`);
    await pageObject.getSetting().verifyCodecDropdownSelected(value);
  }
);

Then(
  /^on the (publisher) (Preview|Stream) page codec dropdown should contain "([^"]*)" options$/,
  async function (this: ScenarioWorld, actor, pageName, options: string) {
    const pageObject = getPageObject(this, `${actor}${pageName}Page`);
    await pageObject.getSetting().verifyCodecDropdownOptions(options.split(','));
  }
);

Then(
  /^on the (publisher) (Preview|Stream) page bitrate dropdown selected value should be "([^"]*)"$/,
  async function (this: ScenarioWorld, actor, pageName, value: string) {
    const pageObject = getPageObject(this, `${actor}${pageName}Page`);
    await pageObject.getSetting().verifyBitrateDropdownSelected(value);
  }
);

Then(
  /^on the (publisher) (Preview|Stream) page bitrate dropdown should contain "([^"]*)" options$/,
  async function (this: ScenarioWorld, actor, pageName, options: string) {
    const pageObject = getPageObject(this, `${actor}${pageName}Page`);
    await pageObject.getSetting().verifyBitrateDropdownOptions(options.split(','));
  }
);

Then(
  /^on the (publisher|viewer) (Preview|Stream) page viewer count value should be "([^"]*)"$/,
  async function (this: ScenarioWorld, actor, pageName, value) {
    const pageObject = getPageObject(this, `${actor}${pageName}Page`);
    await pageObject.getHeaderFooter().verifyViewersCount(value);
  }
);
