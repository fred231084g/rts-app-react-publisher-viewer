/* eslint-disable no-unused-expressions */
import { expect } from '@playwright/test';
import { Locator, Page } from 'playwright';

import { State } from '../utils/type';
import { AddSource } from './components/AddSource';
import { HeaderFooter } from './components/HeaderFooter';
import { Setting } from './components/Setting';
import { StreamStats } from './components/StreamStats';
import { StreamView } from './components/StreamView';
import { verifyComponentState } from './components/ComponentUtils';

export class PublisherStreamPage {
  private page: Page;

  readonly stopBtn: Locator;

  readonly stopSelector = '[test-id=stop-live-indicator]';

  private headerFooterComponent: HeaderFooter;
  private streamViewComponent: StreamView;
  private addSourceComponent: AddSource;
  private settingComponent: Setting;
  private streamStatsComponent: StreamStats;

  constructor(page: Page) {
    this.page = page;
    this.stopBtn = page.locator(this.stopSelector);
    this.headerFooterComponent = new HeaderFooter(page);
    this.streamViewComponent = new StreamView(page);
    this.addSourceComponent = new AddSource(page);
    this.settingComponent = new Setting(page);
    this.streamStatsComponent = new StreamStats(page);
  }

  async waitForPageLoad() {
    console.log('\tPublisherStreamPage:: Wait for page to load');
    await this.page.bringToFront();
    await this.page.waitForSelector(this.stopSelector);
    await this.verifyStopBtnState('visible');
    await this.verifyStopBtnState('enabled');
  }

  async stopStreaming() {
    console.log(`\tPublisherStreamPage: Publisher stop stream`);
    await this.page.bringToFront();
    await this.stopBtn.click();
  }

  async verifyStopBtnState(state: State) {
    console.log(`\tPublisherStreamPage:: Verify stop button is ${state}`);
    await verifyComponentState(this.stopBtn, state);
  }

  async verifyStopBtnText(text: string) {
    console.log(`\tPublisherPreviewPage:: Verify start button text to be ${text}`);
    await expect(this.stopBtn).toHaveText(text);
  }


  getHeaderFooter(): HeaderFooter{
    return this.headerFooterComponent;
  }

  getStreamView(): StreamView{
    return this.streamViewComponent;    
  }

  getAddSource(): AddSource{
    return this.addSourceComponent;
  }

  getSetting(): Setting{
    return this.settingComponent;
  }

  getStreamStats(): StreamStats{
    return this.streamStatsComponent;
  }
}
