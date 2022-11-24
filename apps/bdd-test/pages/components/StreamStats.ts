import { expect } from "@playwright/test";
import { State } from "../../utils/type";
import { Locator, Page } from "playwright";
import { verifyComponentState } from "./ComponentUtils";

export class StreamStats {
    private page: Page

    readonly streamInfoBtn: Locator

    readonly streamInfoPopover: Locator

    readonly streamInfoPopoverTitle: Locator

    readonly statsInfo: Locator

    readonly statsInfoRows: Locator

    constructor(page: Page){
        this.page = page;
        this.streamInfoBtn = page.locator('[test-id=streamInfoButton]');
        this.streamInfoPopover = page.locator('//*[@test-id="streamInfoPopoverTitle"]/parent::*[@role="dialog"]');
        this.streamInfoPopoverTitle = this.streamInfoPopover.locator('[test-id=streamInfoPopoverTitle]');
    
        this.statsInfo = this.streamInfoPopover.locator('[test-id=statisticsInfo]');
        this.statsInfoRows = this.statsInfo.locator('[test-id=nameValuePair]');
    }

    async openStreamInfoPopover(){
        console.log(`\tStreamStats: Open stream info stats`);
        await this.streamInfoBtn.click();
    }

    async getStreamInfoStats(){
        console.log(`\tStreamStats: Read stream info stats`);
        const rowsCount = await this.statsInfoRows.count();
        const stats : { [key: string]: string; } = {};

        for (let i = 0; i < rowsCount; ++i){
            const statsInfoRow = await this.statsInfoRows.nth(i);
            const name = await statsInfoRow.locator('[test-id=name]').innerText();
            const value = await statsInfoRow.locator('[test-id=value]').innerText();
            stats[name] = value
        }
       return stats
    }

    async verifyStreamInfoBtnState(state: State){
        console.log(`\tStreamStats: Verify stream info button state is  ${state}`)
        await verifyComponentState(this.streamInfoBtn, state);
    }

    async verifyStreamInfoPopover(){
        console.log(`\tStreamStats: Verify stream info popover opened`)
        await expect(this.streamInfoPopover).toBeVisible();
    }

    async verifyStreamInfoPopoverTitle(title: string){
        console.log(`\tStreamStats: Verify stream info popover title - ${title}`)
        await expect(this.streamInfoPopoverTitle).toHaveText(title)
    }

    async verifyStreamStats(stats: Record<string, string>){
        console.log(`\tStreamStats: Verify stream info stats`)
        const actualStats = await this.getStreamInfoStats()
        
        // TODO: Verify stats actualStats and stats
    }
}