import { expect } from "@playwright/test";
import { Locator, Page } from "playwright";

export class StreamStats {
    private page: Page

    readonly streamInfoBtn: Locator

    readonly streamInfoPopup: Locator

    readonly streamInfoPopupTitle: Locator

    readonly statsInfo: Locator

    readonly statsInfoRows: Locator

    constructor(page: Page){
        this.page = page;
        this.streamInfoBtn = page.locator('test-id=streamInfoButton');
        this.streamInfoPopup = page.locator('test-id=<>'); // TODO : Add test-id
        this.streamInfoPopupTitle = this.streamInfoPopup.locator('test-id=<>'); // TODO : Add test-id
    
        this.statsInfo = this.streamInfoPopup.locator('test-id=statisticsInfo');
        this.statsInfoRows = this.statsInfo.locator('test-id=nameValuePair'); // TODO : Add test-id nameValuePair and name and value
    }

    async openStreamInfoPopup(){
        console.log(`\tStreamStats: Open stream info stats`);
        await this.streamInfoBtn.click();
    }

    async getStreamInfoStats(){
        console.log(`\tStreamStats: Read stream info stats`);
        const rowsCount = await this.statsInfoRows.count();
        const stats = {};

        for (let i = 0; i < rowsCount; ++i){
            const statsInfoRow = await this.statsInfoRows.nth(i);
            const name = await statsInfoRow.locator('test-id=name').innerText();
            const value = await statsInfoRow.locator('test-id=value').innerText();
            stats[name] = value
        }
       return stats
    }

    async verifyStreamInfoPopup(){
        console.log(`\tStreamStats: Verify stream info popup opened`)
        await expect(this.streamInfoPopup).toBeVisible();
    }

    async verifyStreamInfoPopupTitle(title: string){
        console.log(`\tStreamStats: Verify stream info popup title - ${title}`)
        await expect(this.streamInfoPopupTitle).toHaveText(title)
    }

    async verifyStreamStats(stats: Record<string, string>){
        console.log(`\tStreamStats: Verify stream info stats`)
        const actualStats = await this.getStreamInfoStats()
        
        // TODO: Verify stats actualStats and stats
    }
}