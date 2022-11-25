import { expect } from '@playwright/test';
import { Locator, Page } from 'playwright';

import { State } from '../utils/type';
import { AddSource } from './components/AddSource';
import { HeaderFooter } from './components/HeaderFooter';
import { Setting } from './components/Setting';
import { StreamView } from './components/StreamView';
import { verifyComponentState } from './components/ComponentUtils';
import { StreamStats } from './components/StreamStats';

export class PublisherPreviewPage {
  private page: Page;

  readonly goLiveBtn: Locator;

  readonly goLiveSelector = '[test-id=start-live-indicator]';

  private headerFooterComponent: HeaderFooter;
  private streamViewComponent: StreamView;
  private addSourceComponent: AddSource;
  private settingComponent: Setting;
  private streamStatsComponent: StreamStats;
  
  constructor(page: Page) {
    this.page = page;
    this.goLiveBtn = page.locator(this.goLiveSelector);
    this.headerFooterComponent = new HeaderFooter(page);
    this.streamViewComponent = new StreamView(page);
    this.addSourceComponent = new AddSource(page);
    this.settingComponent = new Setting(page);
    this.streamStatsComponent = new StreamStats(page);

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
    await this.verifyGoLiveBtnState('visible');
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

  getHeaderFooter(): HeaderFooter {
    return this.headerFooterComponent;
  }

  getStreamView(): StreamView {
    return this.streamViewComponent;    
  }

  getAddSource(): AddSource {
    return this.addSourceComponent;
  }

  getSetting(): Setting{
    return this.settingComponent;
  }

  getStreamStats(): StreamStats{
    return this.streamStatsComponent;
  }
}
