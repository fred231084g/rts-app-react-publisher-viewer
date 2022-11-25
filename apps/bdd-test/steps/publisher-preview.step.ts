/* eslint-disable no-unused-vars */
import { Given, When, Then } from '@cucumber/cucumber';

import { getPageObject } from '../pages/PageUtils';
import { options } from '../playwright.config';
import { ScenarioWorld } from '../support/ScenarioWorld';

Given(/^a publisher is on the (Preview) page$/, async function (this: ScenarioWorld, pageName) {
  const pageObject = getPageObject(this, `Publisher${pageName}Page`);
  await pageObject.open(options?.publisherURL as string);
  // TODO: If the Stream page is the first step in SC, then add logic to open and start the stream
  // a publisher is on the (Preview|Stream) page
});


When(/^the publisher clicks on the go live button on the (Preview) page$/, async function (this: ScenarioWorld, pageName) {
  const pageObject = getPageObject(this, `Publisher${pageName}Page`);
  await pageObject.goLive();
});

When(/^the publisher turns (Off|On) simulcast input switch on the (Preview) page$/, async function (this: ScenarioWorld, status, pageName) {
  const pageObject = getPageObject(this, `Publisher${pageName}Page`);
  await pageObject.getSetting().toggleSimulcast(status);
});


Then(
  /^on the publisher (Preview) page go live button should be (visible|hidden|enabled|disabled)$/,
  async function (this: ScenarioWorld, pageName, buttonState) {
    const pageObject = getPageObject(this, `Publisher${pageName}Page`);
    await pageObject.verifyGoLiveBtnState(buttonState);
  }
);

Then(
  /^on the publisher (Preview) page simulcast input switch should be (visible|hidden|enabled|disabled)$/,
  async function (this: ScenarioWorld, pageName, state) {
    const pageObject = getPageObject(this, `Publisher${pageName}Page`);
    await pageObject.getSetting().verifySimulcastSwitchInputState(state);
  }
);

Then(
  /^on the publisher (Preview) page simulcast input switch should be turned (On|Off)$/,
  async function (this: ScenarioWorld, pageName, state) {
    const pageObject = getPageObject(this, `Publisher${pageName}Page`);
    await pageObject.getSetting().verifySimulcastSwitchStatus(state);
  }
);


Then(
  /^on the publisher (Preview) page go live button text should be "([^"]*)"$/,
  async function (this: ScenarioWorld, pageName, value) {
    const pageObject = getPageObject(this, `Publisher${pageName}Page`);
    await pageObject.verifyGoLiveBtnText(value);
  }
);



// When('the publisher copy the viewer link', async () => {
//   await previewPage.copyViewerLink();
// });

// Then('the publisher should be redirected to setup page', async () => {
//   await previewPage.waitForPageLoad();
// });

// Then('the copy link button text should be changed to {string}', async (text) => {
//   await previewPage.verifyCopyLinkButtonText(text);
// });

// Then('the viewer link should be correct', async () => {
//   await previewPage.verifyViewerLink();
// });

// Then(/^the publisher should be shown with microphone button( enabled| disabled)?$/, async (state) => {
//   console.log(`State: ${state}`)
//   await previewPage.getMicrophoneStatus()
// });
