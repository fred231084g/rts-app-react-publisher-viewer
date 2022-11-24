import { Locator, Page } from "playwright";
import { Status, State } from '../../utils/type';
import { expect } from "@playwright/test";
import { verifyComponentState } from "./ComponentUtils";

export class PublisherSetting {
    private page: Page

    readonly settingBtn: Locator

    readonly settingDrawer: Locator

    readonly settingDrawerTitle: Locator

    readonly dropdownCount: Locator

    readonly cameraDefault: Locator

    readonly cameraOptions: Locator

    readonly microphoneDefault: Locator

    readonly microphoneOptions: Locator

    readonly resolutionDefault: Locator

    readonly resolutionOptions: Locator

    readonly bitrateDefault: Locator

    readonly bitrateOptions: Locator

    readonly codecSelectSelector: string;

    readonly codecDefault: Locator

    readonly codecOptions: Locator

    readonly simulcastSwitchLbl: Locator

    readonly simulcastSwitchInput: Locator

    readonly qualityDefault: Locator

    readonly qualityOptions: Locator

    constructor(page: Page){
        this.page = page;
        this.settingBtn = page.locator('[test-id=settingsButton]');
        this.settingDrawer = page.locator('//*[@test-id="settingTitle"]/parent::*[@role="dialog"]');
        this.settingDrawerTitle = this.settingDrawer.locator('[test-id=settingTitle]');

        this.dropdownCount = this.settingDrawer.locator('[test-id*=SelectDefault]');

        this.cameraDefault = this.settingDrawer.locator('[test-id=cameraSelectDefault]');
        this.cameraOptions = this.settingDrawer.locator('[test-id=cameraSelectOptions]');

        this.microphoneDefault = this.settingDrawer.locator('[test-id=microphoneSelectDefault]');
        this.microphoneOptions = this.settingDrawer.locator('[test-id=microphoneSelectOptions]');

        this.codecSelectSelector = '[test-id=codecSelectOptions]';
        this.codecDefault = this.settingDrawer.locator('[test-id=codecSelectDefault]');
        this.codecOptions = this.settingDrawer.locator(this.codecSelectSelector);

        this.resolutionDefault = this.settingDrawer.locator('[test-id=resolutionSelectDefault]');
        this.resolutionOptions = this.settingDrawer.locator('[test-id=resolutionSelectOptions]');

        this.bitrateDefault = this.settingDrawer.locator('[test-id=bitrateSelectDefault]');
        this.bitrateOptions = this.settingDrawer.locator('[test-id=bitrateSelectOptions]');

        this.microphoneDefault = this.settingDrawer.locator('[test-id=microphoneSelectDefault]');
        this.microphoneOptions = this.settingDrawer.locator('[test-id=microphoneSelectOptions]');


        this.simulcastSwitchLbl = this.settingDrawer.locator('[test-id=simulcastSwitch] p');
        this.simulcastSwitchInput = this.settingDrawer.locator('[test-id=simulcastSwitch] input');

        this.qualityDefault = this.settingDrawer.locator('[test-id=qualitySelectDefault]');
        this.qualityOptions = this.settingDrawer.locator('[test-id=qualitySelectOptions]');
    }

    async openSettingDrawer(){
        console.log(`\tSetting: Open setting drawer`);
        await this.settingBtn.click();
    }

    async selectCodec(codec: string){
        console.log(`\tSetting: Select codec - ${codec}`);
        await this.codecDefault.click();
        await this.page.locator(this.codecSelectSelector, {hasText: codec}).click();
    }

    async toggleSimulcast(status: Status){
        console.log(`\tSetting: Simulcast - ${status}`);
        status === 'On' ? this.simulcastSwitchInput.check() : this.simulcastSwitchInput.uncheck();
    }

    async verifySettingBtnState(state: State) {
        console.log(`\tSetting:: Verify setting button state is  ${state}`);
        await verifyComponentState(this.settingBtn, state);
    }

    async verifySettingDrawerState(state: State){
        console.log(`\tSetting: Verify setting drawer opened`)
        await verifyComponentState(this.settingDrawer, state);
    }

    async verifySettingDrawerTitle(title: string){
        console.log(`\tSetting: Verify setting drawer title - ${title}`)
        await expect(this.settingDrawerTitle).toHaveText(title)
    }

    async verifyDropdownCount(count: number){
        console.log(`\tSetting: Verify no of dropdown in setting - ${count}`)
        await expect(this.dropdownCount).toHaveCount(count)
    }

    async verifyCameraDropdownState(state: State){
        console.log(`\tSetting: Verify camera dropdown state - ${state}`)
        await verifyComponentState(this.cameraDefault, state);
    }

    async verifyCameraDropdownOptions(options: [string]){
        console.log(`\tSetting: Verify camera dropdown options - ${options}`)
        const actualOptions = [];
        const count = await this.cameraOptions.count();

        for (let i = 0; i < count; ++i){
            actualOptions.push(await this.cameraOptions.nth(i).textContent());
        }
        await expect(actualOptions).toEqual(options);
    }

    async verifyMicrophoneDropdownState(state: State){
        console.log(`\tSetting: Verify microphone dropdown state - ${state}`)
        await verifyComponentState(this.microphoneDefault, state);
    }

    async verifyMicrophoneDropdownOptions(options: [string]){
        console.log(`\tSetting: Verify microphone dropdown options - ${options}`)
        const actualOptions = [];
        const count = await this.microphoneOptions.count();

        for (let i = 0; i < count; ++i){
            actualOptions.push(await this.microphoneOptions.nth(i).textContent());
        }
        await expect(actualOptions).toEqual(options);
    }

    async verifyResolutionDropdownState(state: State){
        console.log(`\tSetting: Verify resolution dropdown state - ${state}`)
        await verifyComponentState(this.resolutionDefault, state);
    }

    async verifyResolutionDropdownOptions(options: [string]){
        console.log(`\tSetting: Verify resolution dropdown options - ${options}`)
        const actualOptions = [];
        const count = await this.resolutionOptions.count();

        for (let i = 0; i < count; ++i){
            actualOptions.push(await this.resolutionOptions.nth(i).textContent());
        }
        await expect(actualOptions).toEqual(options);
    }

    async verifyBitrateDropdownState(state: State){
        console.log(`\tSetting: Verify bitrate dropdown state - ${state}`)
        await verifyComponentState(this.bitrateDefault, state);
    }

    async verifyBitrateDropdownOptions(options: [string]){
        console.log(`\tSetting: Verify bitrate dropdown options - ${options}`)
        const actualOptions = [];
        const count = await this.bitrateOptions.count();

        for (let i = 0; i < count; ++i){
            actualOptions.push(await this.bitrateOptions.nth(i).textContent());
        }
        await expect(actualOptions).toEqual(options);
    }

    async verifyCodecDropdownSelected(codec: string){
        console.log(`\tSetting: Verify codec dropdown selected option - ${codec}`)
        await expect(this.codecDefault).toHaveText(codec)
    }

    async verifyCodecDropdownOptions(options: [string]){
        console.log(`\tSetting: Verify codec dropdown options - ${options}`)
        const actualOptions = [];
        const count = await this.codecOptions.count();
        for (let i = 0; i < count; ++i){
            actualOptions.push(await this.codecOptions.nth(i).textContent());
        }
        await expect(actualOptions).toEqual(options);
    }

    async verifyCodecDropdownState(state: State){
        console.log(`\tSetting: Verify codec dropdown state - ${state}`)
        await verifyComponentState(this.codecDefault, state);
    }

    async verifySimulcastDropdownLbl(label: string){
        console.log(`\tSetting: Verify simulcast dropdown label - ${label}`)
        await expect(this.simulcastSwitchLbl).toHaveText(label);
    }

    async verifySimulcastSwitchStatus(status: Status){
        console.log(`\tSetting: Verify simulcast switch input status - ${status}`)
        const actualStatus = (await this.simulcastSwitchInput.isChecked()) ? 'On' : 'Off';
        expect(actualStatus).toEqual(status)
    }

    async verifySimulcastSwitchInputState(state: State){
        console.log(`\tSetting: Verify simulcast switch input state - ${state}`)
        await verifyComponentState(this.simulcastSwitchInput, state);
    }
}