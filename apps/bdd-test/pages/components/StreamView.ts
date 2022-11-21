import { expect } from "@playwright/test";
import { State, Status, Screen } from "apps/bdd-test/utils/type";
import { Locator, Page } from "playwright";
import { isButtonToggled, verifyComponentState } from "./Utils";

export class StreamView {
    private page: Page

    readonly videoViewContainer: Locator;

    readonly videoView: Locator;
  
    readonly videoViewSourceName: Locator;
  
    readonly videoViewMicrophoneBtn: Locator;
  
    readonly videoViewCameraBtn: Locator;
  
    readonly  videoViewFullScreenBtn: Locator;

    readonly screenViewContainer: Locator;
  
    readonly screenView: Locator;
  
    readonly screenViewSourceName: Locator;
  
    readonly screenViewMicrophoneBtn: Locator;
  
    readonly screenViewCameraBtn: Locator;
  
    readonly screenViewStopSharingBtn: Locator;
  
    readonly screenViewFullScreenBtn: Locator;

    constructor(page: Page){
        this.page = page

        this.videoViewContainer = page.locator('//*[@test-id="video-view-wrapper"]/parent::*').nth(0);
        this.videoView = this.videoViewContainer.locator('[test-id=video-view]');
        this.videoViewSourceName = this.videoViewContainer.locator('[test-id=sourceName]'); // TODO: Add test-id
        this.videoViewMicrophoneBtn = this.videoViewContainer.locator('[test-id=toggleMicrophoneButton]');
        this.videoViewCameraBtn = this.videoViewContainer.locator('[test-id=toggleCameraButton]');
        this.screenViewFullScreenBtn = this.videoViewContainer.locator('[test-id=fullScreenButton]');

        this.screenViewContainer = page.locator('//*[@test-id="video-view-wrapper"]/parent::*').nth(1);
        this.screenView = this.screenViewContainer.locator('[test-id=video-view]');
        this.screenViewSourceName = this.screenViewContainer.locator('[test-id=sourceName]');
        this.screenViewMicrophoneBtn = this.screenViewContainer.locator('[test-id=toggleMicrophoneButton]');
        this.screenViewCameraBtn = this.screenViewContainer.locator('[test-id=toggleCameraButton]');
        this.screenViewStopSharingBtn = this.screenViewContainer.locator('[test-id=stopScreenShare]');
        this.screenViewFullScreenBtn = this.screenViewContainer.locator('[test-id=fullScreenButton]');
    }

    async getMicrophoneStatus(locator: Locator) {
        console.log(`\tStreamView:: Get microphone status`);
        const toggled = await isButtonToggled(locator, 'data-active');
        return toggled ? 'Off' : 'On';
    }
    
    async getCameraStatus(locator: Locator) {
        console.log(`\tStreamView:: Get camera status`);
        const toggled = await isButtonToggled(locator, 'data-active');
        return toggled ? 'Off' : 'On';
    }

    async turnOffMicrophone(locator: Locator) {
        console.log(`\tStreamView:: Turn Off microphone`);
        if ((await this.getMicrophoneStatus(locator)) === 'On') {
            await locator.click();
        }
    }

    async turnOnMicrophone(locator: Locator) {
        console.log(`\tStreamView:: Turn On microphone`);
        if ((await this.getMicrophoneStatus(locator)) === 'Off') {
            await locator.click();
        }
    }

    async turnOnCamera(locator: Locator) {
        console.log(`\tStreamView:: Turn on camera`);
        if ((await this.getCameraStatus(locator)) === 'Off') {
          await locator.click();
        }
    }
    
    async turnOffCamera(locator: Locator) {
        console.log(`\tStreamView:: Turn off camera`);
        if ((await this.getCameraStatus(locator)) === 'On') {
            await locator.click();
        }
    }

    // Video View
    async verifyVideoViewState(state: State) {
        console.log(`\tStreamView:: Verify video view is ${state}`);
        await verifyComponentState(this.videoView, state);
    }

    async verifyVideoViewSourceName(sourceName: string) {
        console.log(`\tStreamView:: Verify video view source name is ${sourceName}`);
        await expect(this.videoViewSourceName).toHaveText(sourceName);
    }

    async toggleVideoViewMicrophone(status: Status) {
        console.log(`\tStreamView:: Toogle video view microphone button to ${status}`);
        status === 'On' ? await this.turnOnMicrophone(this.videoViewMicrophoneBtn) : await this.turnOffMicrophone(this.videoViewMicrophoneBtn);
    }

    async toggleVideoViewCamera(status: Status) {
        console.log(`\tStreamView:: Toogle video view camera button to ${status}`);
        status === 'On' ? await this.turnOnCamera(this.videoViewCameraBtn) : await this.turnOffCamera(this.videoViewCameraBtn);
    }

    async videoViewFullScreen(screen: Screen) {
        console.log(`\tStreamView:: Video view screen to ${screen}`);
        await this.videoViewFullScreenBtn.click();
    }

    async verifyVideoViewMicrophoneBtnState(state: State) {
        console.log(`\tStreamView:: Verify video view microphone button is ${state}`);
        await verifyComponentState(this.videoViewMicrophoneBtn, state);
    }

    async verifyVideoViewCameraBtnState(state: State) {
        console.log(`\tStreamView:: Verify video view camera button is  ${state}`);
        await verifyComponentState(this.videoViewCameraBtn, state);
    }

    async verifyVideoViewMicrophoneStatus(status: Status) {
        console.log(`\tStreamView:: Verify video view microphone status as ${status}`);
        expect(await this.getMicrophoneStatus(this.videoViewMicrophoneBtn)).toEqual(status);
    }

    async verifyVideoViewCameraStatus(status: Status) {
        console.log(`\tStreamView:: Verify video view camera status as ${status}`);
        expect(await this.getCameraStatus(this.videoViewCameraBtn)).toEqual(status);
    }

    async verifyVideoViewFullScreen(screen: Screen) {
        console.log(`\tStreamView:: Verify video view ${screen} screen`);
        const fullScreen = await this.isFullScreen(this.videoView);
        if (screen === 'full') {
            expect(fullScreen).toBeTruthy();
        } else {
            expect(fullScreen).toBeFalsy();
        }
    }

    // Screen View
    async verifyScreenViewState(state: State) {
        console.log(`\tStreamView:: Verify screen view is ${state}`);
        await verifyComponentState(this.screenView, state);
    }

    async verifyScreenViewSourceName(sourceName: string) {
        console.log(`\tStreamView:: Verify screen view source name is ${sourceName}`);
        await expect(this.screenViewSourceName).toHaveText(sourceName);
    }

    async toggleScreenViewMicrophone(status: Status) {
        console.log(`\tStreamView:: Toogle screen view microphone button to ${status}`);
        status === 'On' ? await this.turnOnMicrophone(this.screenViewMicrophoneBtn) : await this.turnOffMicrophone(this.screenViewMicrophoneBtn);
    }

    async toggleScreenViewCamera(status: Status) {
        console.log(`\tStreamView:: Toogle screen view camera button to ${status}`);
        status === 'On' ? await this.turnOnCamera(this.screenViewCameraBtn) : await this.turnOffCamera(this.screenViewCameraBtn);
    }

    async stopScreenShare() {
        console.log(`\tStreamView:: Stop screen share`);
        await this.turnOnCamera(this.screenViewStopSharingBtn);
    }

    async screenViewFullScreen(screen: Screen) {
        console.log(`\tStreamView:: Screen view to ${screen}`);
        await this.screenViewFullScreenBtn.click();
    }

    async verifyScreenViewMicrophoneBtnState(state: State) {
        console.log(`\tStreamView:: Verify screen view microphone button is ${state}`);
        await verifyComponentState(this.screenViewMicrophoneBtn, state);
    }

    async verifyScreenViewCameraBtnState(state: State) {
        console.log(`\tStreamView:: Verify screen view camera button is  ${state}`);
        await verifyComponentState(this.screenViewCameraBtn, state);
    }

    async verifyStopScreenShareBtnState(state: State) {
        console.log(`\tStreamView:: Verify screen view stop screen button is ${state}`);
        await verifyComponentState(this.screenViewStopSharingBtn, state);
    }

    async verifyScreenViewMicrophoneStatus(status: Status) {
        console.log(`\tStreamView:: Verify screen view microphone status as ${status}`);
        expect(await this.getMicrophoneStatus(this.screenViewMicrophoneBtn)).toEqual(status);
    }

    async verifyScreenCameraStatus(status: Status) {
        console.log(`\tStreamView:: Verify screen view camera status as ${status}`);
        expect(await this.getCameraStatus(this.screenViewCameraBtn)).toEqual(status);
    }

    async verifyScreenSharingIsStarted() {
        console.log(`\tStreamView:: Verify sharing is started`);
        await expect(this.screenView).toBeVisible();
    }
    
    async verifySharingIsStoped() {
        console.log(`\tStreamView:: Verify sharing is stoped`);
        await expect(this.screenView).toBeHidden();
    }

    async verifyScreenViewFullScreen(screen: Screen) {
        console.log(`\tStreamView:: Verify screen view in ${screen}`);
        const fullScreen = await this.isFullScreen(this.screenView);
        if (screen === 'full') {
            expect(fullScreen).toBeTruthy();
        } else {
            expect(fullScreen).toBeFalsy();
        }
    }


    async isFullScreen(locator: Locator) {
        const attributeValue = await locator.getAttribute('class');
        if (attributeValue?.includes('video--fullscreen')) {
          return true;
        }
        return false;
    }
}