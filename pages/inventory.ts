import {expect, type Page, type Locator, selectors } from '@playwright/test';

export class InventoryPage {

    readonly page: Page;
    readonly inventoryURL: string;
    // readonly inventoryItemName: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inventoryURL = "https://www.saucedemo.com/inventory.html";
        // this.inventoryItemName = page.getByTestId('inventory-item-name');

    }

    async goToInventory() {
        await this.page.goto(this.inventoryURL);
    }

    async getTitles() {
        await this.page.waitForSelector('.inventory_item_name');
        const itemTitleList = await this.page.$$(".inventory_item_name");
        console.log(itemTitleList.length);
        const titlesArray: string[] = [];
        for(let i = 0; i < itemTitleList.length; i++) {
            titlesArray[i] = (await itemTitleList[i].textContent())!
        };
        return titlesArray;
    }
    
}