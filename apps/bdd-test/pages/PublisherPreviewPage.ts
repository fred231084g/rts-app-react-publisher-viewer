import { expect } from '@playwright/test';
import { Locator, Page } from 'playwright';

import { State } from '../utils/type';
import { AddSource } from './components/AddSource';
import { HeaderFooter } from './components/HeaderFooter';
import { PublisherSetting } from './components/PublisherSetting';
import { StreamView } from './components/StreamView';
import { verifyComponentState } from './components/Utils';

export class PublisherPreviewPage {
  private page: Page;

  readonly goLiveBtn: Locator;

  readonly goLiveSelector = '[test-id=live-indicator]';

  private headerFooterComponent: HeaderFooter;
  private streamViewComponent: StreamView;
  private addSourceComponent: AddSource;
  private publisherSettingComponent: PublisherSetting;
  
  constructor(page: Page) {
    this.page = page;
    this.goLiveBtn = page.locator(this.goLiveSelector);
    this.headerFooterComponent = new HeaderFooter(page);
    this.streamViewComponent = new StreamView(page);
    this.addSourceComponent = new AddSource(page);
    this.publisherSettingComponent = new PublisherSetting(page);
  }

  async open(url: string) {
    console.log(`\tPublisherPreviewPage:: Open publisher application - ${url}`);
    await this.page.bringToFront();
    await this.page.goto(url);
    await this.waitForPageLoad();
  }

  async waitForPageLoad() {
    console.log(`\tPublisherPreviewPage:: Wait for page to load`);
    await this.page.waitForSelector(this.goLiveSelector);
    await this.verifyGoLiveBtnState('enabled');
  }

  async goLive() {
    console.log(`\tPublisherPreviewPage: Publisher go live`);
    await this.page.bringToFront();
    await this.goLiveBtn.click();
  }

  async verifyGoLiveBtnState(state: State) {
    console.log(`\tPublisherPreviewPage:: Verify go live button is ${state}`);
    await verifyComponentState(this.goLiveBtn, state);
  }

  async verifyGoLiveBtnText(text: string) {
    console.log(`\tPublisherPreviewPage:: Verify go live button text to be ${text}`);
    await expect(this.goLiveBtn).toHaveText(text);
  }

  async getHeaderFooter(){
    return this.headerFooterComponent;
  }

  async getstreamView(){
    return this.streamViewComponent;    
  }

  async getaddSource(){
    return this.addSourceComponent;
  }

  async getSetting(){
    return this.publisherSettingComponent;
  }

}
