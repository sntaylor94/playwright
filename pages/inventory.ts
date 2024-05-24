import { type Page, type Locator } from '@playwright/test';
import * as selectors from './../utils/selectors.json'

export class InventoryPage {

    readonly page: Page;
    readonly inventoryURL: string;
    readonly sortDropdown: Locator;
    readonly cartBadge: string;

    constructor(page: Page) {
        this.page = page;
        this.inventoryURL = selectors.InventoryPage.inventoryPageURL;
        this.sortDropdown = page.getByTestId(selectors.InventoryPage.sortDropdown);
        this.cartBadge = selectors.InventoryPage.cartBadge;
    }

    async goToInventory() {
        await this.page.goto(this.inventoryURL);
    }

    async getTitles() {
        await this.page.waitForSelector(selectors.InventoryPage.inventoryItemName);
        const itemTitleList = await this.page.$$(selectors.InventoryPage.inventoryItemName);
        const titlesArray: string[] = [];
        for(let i = 0; i < itemTitleList.length; i++) {
            titlesArray[i] = (await itemTitleList[i].textContent())!
        };
        return titlesArray;
    }

    async getPrices() {
        await this.page.waitForSelector(selectors.InventoryPage.inventoryItemPrice);
        const itemPriceList = await this.page.$$(selectors.InventoryPage.inventoryItemPrice)
        const priceArray: string[] = [];
        for(let i = 0; i < itemPriceList.length; i++) {
            priceArray[i] = (await itemPriceList[i].textContent())!
        }
        return priceArray;
    }

    async sortInventory (sortType: string) {
        await this.sortDropdown.selectOption(sortType);
    }

    async getAddButton(item: string) {
        return await this.page
            .getByTestId(selectors.InventoryPage.addItemButton + item
            .toLowerCase().replace(/\s/g, '-'));
    }

    async getRemoveButton(item: string) {
        return await this.page
            .getByTestId(selectors.InventoryPage.removeItemButton + item
            .toLowerCase().replace(/\s/g, '-'));
    }

    async addToCart(item: string) {
        const addItemButton = await this.page
            .getByTestId(selectors.InventoryPage.addItemButton + item
            .toLowerCase().replace(/\s/g, '-'));
        await addItemButton.click();
    }

    async removeFromCart(item: string) {
         const removeItemButton = await this.page
            .getByTestId(selectors.InventoryPage.removeItemButton + item
            .toLowerCase().replace(/\s/g, '-'));
         await removeItemButton.click();
    }

    async getCartCount() {
       return await this.page.getByTestId(this.cartBadge).textContent();
    }
    
}