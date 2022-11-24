import { expect } from "@playwright/test";
import { State } from '../../utils/type';
import { Locator, Page } from "playwright";
import { verifyComponentState } from "./ComponentUtils";


export class HeaderFooter {
    private page: Page;

    readonly companyNameSelector: string;

    readonly companyNameLbl: Locator;

    readonly timerLbl: Locator;

    readonly streamStatusLbl: Locator;

    readonly multiSourceLbl: Locator;

    readonly inviteViewersBtn: Locator;

    readonly viewersCountLbl: Locator;

    readonly header: Locator;

    readonly description: Locator;

    readonly appVersion: Locator;

    constructor(page: Page) {
        this.page = page
        this.companyNameSelector = '[test-id=actionBar] [test-id=headingName]';
        this.companyNameLbl = page.locator(this.companyNameSelector);
        this.timerLbl = page.locator('[test-id=timer] p');
        this.streamStatusLbl = page.locator('[test-id=streamStatus]');
        this.multiSourceLbl = page.locator('[test-id=multiSource]');
        this.inviteViewersBtn = page.locator('[test-id=shareLinkButton]');
        this.viewersCountLbl = page.locator('[test-id=participantCountView] p');
        this.header = page.locator('[test-id=pageHeader]');
        this.description = page.locator('[test-id=pageDesc]');
        this.appVersion = page.locator('[test-id=appVersion]');
    }

    async waitForComponent() {
        console.log(`\tHeaderFooter:: Wait for component to load`);
        await this.page.waitForSelector(this.companyNameSelector);
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
 
    async verifyMultiSource(text: string) {
        console.log(`\tHeaderFooter:: Verify multisource to be ${text}`);
        await expect(this.multiSourceLbl).toHaveText(text);
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

    async verifyStreamingDotLblState(state: State) {
        console.log(`\tHeaderFooter:: Verify streaming dot label is ${state}`);
        await verifyComponentState(this.streamStatusLbl, state);
    }

    async verifyMultiSourceLblState(state: State) {
        console.log(`\tHeaderFooter:: Verify multisource label is ${state}`);
        await verifyComponentState(this.multiSourceLbl, state);
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