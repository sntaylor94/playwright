import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/inventory';
import { LoginPage } from '../pages/login';

const STANDARD_USER_ID = "standard_user";
const SAUCE_USER_PASSWORD = "secret_sauce";

test.describe("Sort Inventory", () => {

    test('sort reverse alphabetical', async ({ page }) => {
        const loginPage = new LoginPage(page)
        const inventoryPage = new InventoryPage(page);
        
        await loginPage.login(STANDARD_USER_ID, SAUCE_USER_PASSWORD);
        await inventoryPage.goToInventory();
        const itemTitles = await inventoryPage.getTitles();
        console.log(itemTitles);
        await expect(itemTitles).toHaveLength(0);
    });

});