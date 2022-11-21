import { Locator, Page } from "playwright";
import { Status, State } from "apps/bdd-test/utils/type";
import { expect } from "@playwright/test";
import { verifyComponentState } from "./Utils";

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

    readonly codecSelectSelector: string;

    readonly codecDefault: Locator

    readonly codecOptions: Locator

    readonly simulcastSwitchLbl: Locator

    readonly simulcastSwitchInput: Locator

    constructor(page: Page){
        this.page = page;
        this.settingBtn = page.locator('test-id=settingsButton');
        this.settingDrawer = page.locator('[role="dialog"][id*="settingsDrawer"]'); // TODO: Add test-id
        this.settingDrawerTitle = this.settingDrawer.locator('test-id=drawerTitle'); // TODO: Add test-id

        this.dropdownCount = this.settingDrawer.locator('[test-id*=SelectDefault]');

        this.cameraDefault = this.settingDrawer.locator('test-id=cameraSelectDefault'); // TODO: Add test-id
        this.cameraOptions = this.settingDrawer.locator('test-id=cameraSelectOptions'); // TODO: Add test-id

        this.microphoneDefault = this.settingDrawer.locator('test-id=microphoneSelectDefault'); // TODO: Add test-id
        this.microphoneOptions = this.settingDrawer.locator('test-id=microphoneSelectOptions'); // TODO: Add test-id

        this.codecDefault = this.settingDrawer.locator('test-id=codecSelectDefault'); // TODO: Add test-id
        this.codecOptions = this.settingDrawer.locator('test-id=codecSelectOptions'); // TODO: Add test-id

        this.codecSelectSelector = 'test-id=resolutionSelectOptions';
        this.resolutionDefault = this.settingDrawer.locator('test-id=resolutionSelectDefault'); // TODO: Add test-id
        this.resolutionOptions = this.settingDrawer.locator(this.codecSelectSelector); // TODO: Add test-id

        this.simulcastSwitchLbl = this.settingDrawer.locator('[test-id=simulcastSwitch] p');
        this.simulcastSwitchInput = this.settingDrawer.locator('[test-id=simulcastSwitch] input');
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

    async verifySettingDrawer(){
        console.log(`\tSetting: Verify setting drawer opened`)
        await expect(this.settingDrawer).toBeVisible();
    }

    async verifySettingDrawerTitle(title: string){
        console.log(`\tSetting: Verify setting drawer title - ${title}`)
        await expect(this.settingDrawerTitle).toHaveText(title)
    }

    async verifyDropdownCount(count: number){
        console.log(`\tSetting: Verify no of dropdown in setting - ${count}`)
        await expect(this.dropdownCount).toHaveCount(count)
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
            actualOptions.push(await this.codecOptions.nth(i).innerText());
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
        const actualStatus = (this.simulcastSwitchInput.isChecked()) ? 'On' : 'Off';
        expect(actualStatus).toEqual(status)
    }

    async verifySimulcastSwitchInputState(state: State){
        console.log(`\tSetting: Verify simulcast switch input state - ${state}`)
        await verifyComponentState(this.simulcastSwitchInput, state);
    }
}