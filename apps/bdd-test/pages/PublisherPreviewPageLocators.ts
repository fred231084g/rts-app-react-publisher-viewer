import { Locator, Page } from 'playwright';

import CommonLocators from './CommonLocators';

export default class PublisherPreviewPageLocators extends CommonLocators {
  readonly goLiveBtn: Locator;

  readonly heading: Locator;

  readonly description: Locator;

  readonly goLiveSelector = '[test-id=live-indicator]';

  constructor(page: Page) {
    super(page);
    this.goLiveBtn = page.locator(this.goLiveSelector);
    this.heading = page.locator('[test-id=getStartedInfoTitle]');
    this.description = page.locator('[test-id=getStartedInfoDesc]');
  }
}
