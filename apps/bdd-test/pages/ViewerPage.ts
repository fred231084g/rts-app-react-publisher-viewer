import { Page } from 'playwright';
import { HeaderFooter } from './components/HeaderFooter';
import { StreamStats } from './components/StreamStats';
import { StreamView } from './components/StreamView';
import { ViewerSetting } from './components/ViewerSetting';

export class ViewerPage {
  private page: Page;

  private headerFooterComponent: HeaderFooter;
  private streamViewComponent: StreamView;
  private viewerSettingComponent: ViewerSetting;
  private streamStatsComponent: StreamStats;

  constructor(page: Page) {
    this.page = page;
    this.headerFooterComponent = new HeaderFooter(page);
    this.streamViewComponent = new StreamView(page);
    this.streamStatsComponent = new StreamStats(page);
    this.viewerSettingComponent = new ViewerSetting(page);
  }

  async open(url: string) {
    console.log(`\tPublisherPreviewPage:: Open publisher application - ${url}`);
    await this.page.bringToFront();
    await this.page.goto(url);
    await this.waitForPageLoad();
  }

  async waitForPageLoad() {
    console.log(`\tPublisherPreviewPage:: Wait for page to load`);
    await this.headerFooterComponent.waitForComponent()
  }

  async getHeaderFooter(){
    return this.headerFooterComponent;
  }

  async getstreamView(){
    return this.streamViewComponent;    
  }

  async getSetting(){
    return this.viewerSettingComponent;
  }

  async getStreamStats(){
    return this.streamStatsComponent;
  }

}
