import { Locator, Page } from 'playwright';

export default class CommonLocators {
  private page: Page;

  readonly companyNameLbl: Locator;

  readonly timerLbl: Locator;

  readonly inviteViewersBtn: Locator;

  readonly videoViewContainer: Locator;

  readonly videoView: Locator;

  readonly videoViewInfoLbl: Locator;

  readonly videoViewMicrophoneBtn: Locator;

  readonly videoViewCameraBtn: Locator;

  readonly screenViewContainer: Locator;

  readonly screenView: Locator;

  readonly screenViewInfoLbl: Locator;

  readonly screenViewMicrophoneBtn: Locator;

  readonly screenViewCameraBtn: Locator;

  readonly screenViewStopSharingBtn: Locator;

  readonly screenViewFullScreenBtn: Locator;

  readonly addSourceBtn: Locator;

  readonly shareScreenBtn: Locator;

  readonly settingsBtn: Locator;

  readonly appVersion: Locator;

  constructor(page: Page) {
    this.page = page;
    this.companyNameLbl = page.locator('[test-id=actionBar] [test-id=headingName]');
    this.timerLbl = page.locator('[test-id=timer] p');
    this.inviteViewersBtn = page.locator('[test-id=shareLinkButton]');
    
    this.videoViewContainer = page.locator('//*[@test-id="video-view-wrapper"]/parent::*').nth(0);
    this.videoView = this.videoViewContainer.locator('[test-id=video-view]');
    this.videoViewInfoLbl = this.videoViewContainer.locator('[test-id=viewInfoLabel]');
    this.videoViewMicrophoneBtn = this.videoViewContainer.locator('[test-id=toggleMicrophoneButton]');
    this.videoViewCameraBtn = this.videoViewContainer.locator('[test-id=toggleCameraButton]');
    
    this.screenViewContainer = page.locator('//*[@test-id="video-view-wrapper"]/parent::*').nth(1);
    this.screenView = this.screenViewContainer.locator('[test-id=video-view]');
    this.screenViewInfoLbl = this.screenViewContainer.locator('[test-id=viewInfoLabel]');
    this.screenViewMicrophoneBtn = this.screenViewContainer.locator('[test-id=toggleMicrophoneButton]');
    this.screenViewCameraBtn = this.screenViewContainer.locator('[test-id=toggleCameraButton]');
    this.screenViewStopSharingBtn = this.screenViewContainer.locator('[test-id=stopScreenShare]');
    this.screenViewFullScreenBtn = this.screenViewContainer.locator('[test-id=fullScreenButton]');

    this.addSourceBtn = page.locator('[test-id=addSourceButton]'); // Add test-id
    this.shareScreenBtn = page.locator('[test-id=shareScreenButton]'); // Add test-id
    
    this.settingsBtn = page.locator('[test-id=settingsButton]');
    this.appVersion = page.locator('[test-id=appVersion]');
  }
}
