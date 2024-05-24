import { type Page, type Locator } from '@playwright/test';

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

    //refactor to make this reusable for each item
    async getCartItemQuantity(item: string) {
        const cartQuantity = await this.cartItem.getByText('1Sauce Labs Backpackcarry.').locator('[data-test="item-quantity"]').textContent();
    }

    async getCartItemName() {

    }

}
