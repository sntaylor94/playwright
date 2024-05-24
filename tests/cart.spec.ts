import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/inventory';
import { CartPage } from '../pages/cart';
import { LoginPage } from '../pages/login';

test.describe("Standard User cart interactions", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)
        await loginPage.login(process.env.STANDARD_USER_ID!, process.env.SAUCE_USER_PASSWORD!);
    })

    test('verify one item can be added and viewed in cart', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);

        //add backpack to cart
        await inventoryPage.addToCart('sauce labs backpack');

        //go to the cart
        await cartPage.goToCart();
        await page.waitForURL(cartPage.cartUrl);
        
        //Expect Sauce Labs Backpack item to be added to the cart & the quantity of said item to be 1
        expect(await cartPage.getCartItemName('sauce labs backpack'), "Item should be present in cart").toBe("Sauce Labs Backpack");
        expect(await cartPage.getCartItemQuantity('sauce labs backpack'), "Item quantity should equal 1").toEqual("1");
    })
})
