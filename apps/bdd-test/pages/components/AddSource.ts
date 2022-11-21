import { expect } from "@playwright/test";
import { State } from "apps/bdd-test/utils/type";
import { Locator, Page } from "playwright";
import { verifyComponentState } from "./Utils";

export class AddSource {
    private page: Page;

    readonly addSourceBtn: Locator;

    readonly shareScreenBtn: Locator;


    constructor(page: Page) {
        this.page = page
        this.addSourceBtn = page.locator('[test-id=addSourceButton]'); // Add test-id
        this.shareScreenBtn = page.locator('[test-id=Sharescreen]'); // Add test-id
    }

    async openAddSourceMenu() {
        console.log(`\tAddSource:: Open add source menu`);
        await this.addSourceBtn.click();
    }

    async shareScreen() {
        console.log(`\tAddSource:: Share the screen`);
        await this.shareScreenBtn.click();
    }

    async verifySubMenu(subMenus: [string]) {
        console.log(`\tAddSource:: Verify sub-menus ${subMenus}`);
       // TODO: Get the subMenus and Verify
    }

    async verifyAddSourceBtnText(text: string) {
        console.log(`\tAddSource:: Verify add source button text to be ${text}`);
        await expect(this.addSourceBtn).toHaveText(text);
    }

    async verifyShareScreenBtnText(text: string) {
        console.log(`\tAddSource:: Verify share screen button text to be ${text}`);
        await expect(this.shareScreenBtn).toHaveText(text);
    }

    async verifyAddSourceBtnState(state: State) {
        console.log(`\tHeaderFooter:: Verify add source button is  ${state}`);
        await verifyComponentState(this.addSourceBtn, state);
    }

    async verifyShareScreenBtnState(state: State) {
        console.log(`\tHeaderFooter:: Verify share screen button is  ${state}`);
        await verifyComponentState(this.shareScreenBtn, state);
    }
}