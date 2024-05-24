import {expect, type Page, type Locator, selectors } from '@playwright/test';

export class InventoryPage {

    readonly page: Page;
    readonly inventoryURL: string;
    readonly sortDropdown: Locator;
    readonly cartBadge: string;

    constructor(page: Page) {
        this.page = page;
        this.inventoryURL = "https://www.saucedemo.com/inventory.html";
        this.sortDropdown = page.getByTestId('product-sort-container');
        this.cartBadge = 'shopping-cart-badge';
    }

    async goToInventory() {
        await this.page.goto(this.inventoryURL);
    }

    async getTitles() {
        await this.page.waitForSelector('.inventory_item_name');
        const itemTitleList = await this.page.$$('.inventory_item_name');
        const titlesArray: string[] = [];
        for(let i = 0; i < itemTitleList.length; i++) {
            titlesArray[i] = (await itemTitleList[i].textContent())!
        };
        return titlesArray;
    }

    async getPrices() {
        await this.page.waitForSelector('.inventory_item_price');
        const itemPriceList = await this.page.$$('.inventory_item_price')
        const priceArray: string[] = [];
        for(let i = 0; i < itemPriceList.length; i++) {
            priceArray[i] = (await itemPriceList[i].textContent())!
        }
        return priceArray;
    }

    async sortInventory (sortType: string) {
        await this.sortDropdown.selectOption(sortType);
    }

    async getAddButton(item: String) {
        return await this.page.getByTestId('add-to-cart-' + item.toLowerCase().replace(/\s/g, '-'));
    }

    async getRemoveButton(item: String) {
        return await this.page.getByTestId('remove-' + item.toLowerCase().replace(/\s/g, '-'));
    }

    async addToCart(item: String) {
        const addItemButton = await this.page.getByTestId('add-to-cart-' + item.toLowerCase().replace(/\s/g, '-'));
        await addItemButton.click();
    }

    async removeFromCart(item: String) {
         const removeItemButton = await this.page.getByTestId('remove-' + item.toLowerCase().replace(/\s/g, '-'));
         await removeItemButton.click();
    }

    async getCartCount() {
       return await this.page.getByTestId(this.cartBadge).textContent();
    }
    
}