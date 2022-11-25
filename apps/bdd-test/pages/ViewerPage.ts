import { Page } from 'playwright';
import { AddSource } from './components/AddSource';
import { HeaderFooter } from './components/HeaderFooter';
import { Setting } from './components/Setting';
import { StreamStats } from './components/StreamStats';
import { StreamView } from './components/StreamView';

export class ViewerPage {
  private page: Page;

  private headerFooterComponent: HeaderFooter;
  private streamViewComponent: StreamView;
  private addSourceComponent: AddSource;
  private streamStatsComponent: StreamStats;
  private settingComponent: Setting;

  constructor(page: Page) {
    this.page = page;
    this.headerFooterComponent = new HeaderFooter(page);
    this.streamViewComponent = new StreamView(page);
    this.addSourceComponent = new AddSource(page);
    this.streamStatsComponent = new StreamStats(page);
    this.settingComponent = new Setting(page);
  }

  async open(url: string) {
    console.log(`\tViewerPage:: Open publisher application - ${url}`);
    await this.page.bringToFront();
    await this.page.goto(url);
    await this.waitForPageLoad();
  }

  async waitForPageLoad() {
    console.log(`\tViewerPage:: Wait for page to load`);
    await this.headerFooterComponent.waitForComponent()
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
