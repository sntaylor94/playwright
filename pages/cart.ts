import {expect, type Page, type Locator, selectors } from '@playwright/test';

export class CartPage {

    readonly page: Page;
    readonly cartUrl: string;
    readonly cartItem: Locator;
    readonly cartItemQuantity: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartUrl = "https://www.saucedemo.com/cart.html";
        this.cartItem = page.locator('.cart_item');
        this.cartItemQuantity = page.getByTestId('item-quantity')
    }

    async goToCart() {
        await this.page.goto(this.cartUrl);
    }

    async getCartItemQuantity() {
        const cartQuantity = await this.cartItem.getByText('1Sauce Labs Backpackcarry.').locator('[data-test="item-quantity"]').textContent();
        return cartQuantity;
    }

    async getCartItemName() {
        const cartItemName = await this.cartItem.getByText('1Sauce Labs Backpackcarry.').locator('[data-test="inventory-item-name"]').textContent();
        return cartItemName;
    }

}
