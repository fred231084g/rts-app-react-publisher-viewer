/* eslint-disable no-unused-vars */
import { Given, When, Then } from '@cucumber/cucumber';

import { getPageObject } from '../pages/PageUtils';
import { options } from '../playwright.config';
import { ScenarioWorld } from '../support/ScenarioWorld';
import { capitalize } from '../utils/helper';


Given(/^a (viewer) is on the (Waiting Room) page$/, async function (this: ScenarioWorld, actor, pageName) {
  const pageObject = getPageObject(this, `${actor}${pageName}Page`);
  await pageObject.open(options?.viewerURL as string);
});

When(
  /^the (viewer) clicks on video view (full|normal) screen button on the (Stream) page$/,
  async function (this: ScenarioWorld, actor, screen, pageName) {
    const pageObject = getPageObject(this, `${actor}${pageName}Page`);
    // TODO: Add Method
  }
);
