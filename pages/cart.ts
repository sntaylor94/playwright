import {expect, type Page, type Locator } from '@playwright/test';
import * as selectors from './../utils/selectors.json'

export class CartPage {

    readonly page: Page;
    readonly cartUrl: string;
    readonly cartItem: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartUrl = selectors.CartPage.cartPageURL;
        this.cartItem = page.locator(selectors.CartPage.cartItem);
    }

    async goToCart() {
        await this.page.goto(this.cartUrl);
    }

    async getCartItemQuantity(item: string) {
        const cartQuantity = await this.page.locator(selectors.CartPage.cartItem + item + '")')
            .locator(selectors.CartPage.cartItemQuantity).textContent();
        return cartQuantity;
    }

    async getCartItemName(item: string) {
        const cartItemName = await this.page.locator(selectors.CartPage.cartItem + item + '")')
            .locator(selectors.CartPage.inventoryItemName).textContent();
        return cartItemName;
    }

}
