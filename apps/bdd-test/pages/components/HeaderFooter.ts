import { expect } from "@playwright/test";
import { State } from "apps/bdd-test/utils/type";
import { Locator, Page } from "playwright";
import { verifyComponentState } from "./Utils";


export class HeaderFooter {
    private page: Page;

    readonly companyNameLbl: Locator;

    readonly timerLbl: Locator;

    readonly streamStatusLbl: Locator;

    readonly inviteViewersBtn: Locator;

    readonly viewersCountLbl: Locator;

    readonly header: Locator;

    readonly description: Locator;

    readonly appVersion: Locator;

    constructor(page: Page) {
        this.page = page
        this.companyNameLbl = page.locator('[test-id=actionBar] [test-id=headingName]');
        this.timerLbl = page.locator('[test-id=timer] p');
        this.streamStatusLbl = page.locator('[test-id=streamStatus]'); // Add test-id
        this.inviteViewersBtn = page.locator('[test-id=shareLinkButton]');
        this.viewersCountLbl = page.locator('[test-id=participantCountView] p');
        this.header = page.locator('[test-id=getStartedInfoTitle]');
        this.description = page.locator('[test-id=getStartedInfoDesc]'); // Add test-id
        this.appVersion = page.locator('[test-id=appVersion]');
    }

    async copyInviteViewersLink() {
        console.log(`\tHeaderFooter: Copy invite viewers link`);
        await this.inviteViewersBtn.click();
    }

    async verifyCompanyName(text: string) {
        console.log(`\tHeaderFooter:: Verify company name to be ${text}`);
        await expect(this.companyNameLbl).toHaveText(text);
    }
    
    async verifyTimer(text: string) {
        console.log(`\tHeaderFooter:: Verify timer to be ${text}`);
        await expect(this.timerLbl).toHaveText(text);
    }

    async verifyTimerIsGreaterThan(value: number) {
        console.log(`\tHeaderFooter:: Verify timer to be in between ${value - 2} and ${value + 5} `);
        const duration = await this.timerLbl.innerText();
        await expect(this.convertDurationtoSeconds(duration)).toBeGreaterThanOrEqual(value - 2);
        await expect(this.convertDurationtoSeconds(duration)).toBeLessThanOrEqual(value + 5);
      }
    
    async verifyStreamingLblStatus(status: 'red') {
        console.log(`\tHeaderFooter:: Verify streaming label is ${status}`);
        // TODO: Get the background color and verify
    }
    
    async verifyViewersCount(count: string) {
        console.log(`\tHeaderFooter:: Verify participant count is ${count}`);
        await expect(this.viewersCountLbl).toHaveText(`${count} participants`);
    }

    async verifyGetStartedHeader(text: string) {
        console.log(`\tHeaderFooter:: Verify get started header as ${text}`);
        await expect(this.header).toHaveText(text);
    }

    async verifyGetStartedDesc(text: string) {
        console.log(`\tHeaderFooter:: Verify get started description as ${text}`);
        await expect(this.description).toHaveText(text);
    }

    async verifyAppVersion(version: string) {
        console.log(`\tHeaderFooter:: Verify app version is ${version}`);
        await expect(this.appVersion).toHaveText(version);
    }

    async verifyInviteViewersButtonText(text: string) {
        console.log(`\tHeaderFooter:: Verify invite viewers button text to be ${text}`);
        await expect(this.inviteViewersBtn).toHaveText(text);
    }

    async verifyCompanyNameLblState(state: State) {
        console.log(`\tHeaderFooter:: Verify company name label is ${state}`);
        await verifyComponentState(this.companyNameLbl, state);
    }

    async verifyStreamingTimeLblState(state: State) {
        console.log(`\tHeaderFooter:: Verify streaming time label is ${state}`);
        await verifyComponentState(this.timerLbl, state);
    }

    async verifyInviteBtnState(state: State) {
        console.log(`\tHeaderFooter:: Verify invite button is  ${state}`);
        await verifyComponentState(this.inviteViewersBtn, state);
    }

    async verifyViewersCountState(state: State) {
        console.log(`\tHeaderFooter:: Verify viewer count label is ${state}`);
        await verifyComponentState(this.viewersCountLbl, state);
    }

    async verifyHeaderLblState(state: State) {
        console.log(`\tHeaderFooter:: Verify header label is ${state}`);
        await verifyComponentState(this.header, state);
    }

    async verifyDescriptionLblState(state: State) {
        console.log(`\tHeaderFooter:: Verify description label is ${state}`);
        await verifyComponentState(this.description, state);
    }

    async verifyAppVersionState(state: State) {
        console.log(`\tHeaderFooter:: Verify app version label is ${state}`);
        await verifyComponentState(this.appVersion, state);
    }

    convertDurationtoSeconds(duration: string) {
        const [hours, minutes, seconds] = duration.split(':');
        return Number(hours) * 60 * 60 + Number(minutes) * 60 + Number(seconds);
    }
}