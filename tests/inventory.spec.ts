import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/inventory';
import { LoginPage } from '../pages/login';
import * as helper from '../utils/helper-methods'

const STANDARD_USER_ID = "standard_user";
const SAUCE_USER_PASSWORD = "secret_sauce";
const ABC_SORT = "az";
const REVERSE_ABC_SORT = "za";
const LOW_HIGH_SORT = "lohi";
const HIGH_LOW_SORT = "hilo";


test.describe("Sort Inventory", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)
        await loginPage.login(STANDARD_USER_ID, SAUCE_USER_PASSWORD);
    })

    test('sort alphabetical', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);

        //Sort by alphabetical order
        await inventoryPage.sortInventory(ABC_SORT);
        const itemTitles = await inventoryPage.getTitles();      

        //Sort array of titles & compare to unsorted
        const sortedTitles = itemTitles.sort();
        const orderMatches = helper.compareStringArray(itemTitles, sortedTitles);

        //Expect the sorted array to match the order of titles on the page
        await expect(orderMatches, 'Items should be sorted in alphabetical order').toBe(true);
    });

    test('sort reverse alphabetical', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        //Sort by reverse alphabetical order
        await inventoryPage.sortInventory(REVERSE_ABC_SORT);
        const itemTitles = await inventoryPage.getTitles();

        //sort array by reverse alphabetical order & compare to unsorted
        const sortedTitles = itemTitles.sort().reverse();
        const orderMatches = helper.compareStringArray(itemTitles, sortedTitles)
        await expect(orderMatches, 'Items should be sorted in reverse alphabetical order').toBe(true);
    });

});