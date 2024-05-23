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


// test.describe("Sort Inventory", () => {
//     test.beforeEach(async ({ page }) => {
//         const loginPage = new LoginPage(page)
//         await loginPage.login(STANDARD_USER_ID, SAUCE_USER_PASSWORD);
//     })

//     test('sort alphabetical', async ({ page }) => {
//         const inventoryPage = new InventoryPage(page);

//         //Sort by alphabetical order
//         await inventoryPage.sortInventory(ABC_SORT);
//         const itemTitles = await inventoryPage.getTitles();      

//         //Sort array of titles & compare to page
//         const sortedTitles = itemTitles.sort();
//         const orderMatches = helper.compareStringArray(itemTitles, sortedTitles);

//         //Expect the sorted array to match the order of titles on the page
//         await expect(orderMatches, 'Items should be sorted in alphabetical order').toBe(true);
//     });

//     test('sort reverse alphabetical', async ({ page }) => {
//         const inventoryPage = new InventoryPage(page);

//         //Sort by reverse alphabetical order
//         await inventoryPage.sortInventory(REVERSE_ABC_SORT);
//         const itemTitles = await inventoryPage.getTitles();

//         //sort array by reverse alphabetical order & compare to page
//         const sortedTitles = itemTitles.sort().reverse();
//         const orderMatches = helper.compareStringArray(itemTitles, sortedTitles)
//         await expect(orderMatches, 'Items should be sorted in reverse alphabetical order').toBe(true);
//     });

//     test('sort price ascending', async ({ page }) => {
//         const inventoryPage = new InventoryPage(page);

//         //sort page inventory items by price low to high
//         await inventoryPage.sortInventory(LOW_HIGH_SORT);
//         const pricesArray = await helper.convertStringArrayIntoNumArray(await inventoryPage.getPrices());

//         //sort array by prices low to high & compare to page
//         const sortedPrices = await helper.sortNumArrayAscending(pricesArray);
//         const orderMatches = await helper.compareNumArray(pricesArray, sortedPrices);

//         //Expect sorted prices to match order of prices on page
//         await expect(orderMatches, 'Prices should be sorted low to high').toBe(true);
//     });

//     test('sort price descending', async ({ page }) => {
//         const inventoryPage = new InventoryPage(page);

//         //sort page inventory items by price low to high
//         await inventoryPage.sortInventory(HIGH_LOW_SORT);
//         const pricesArray = await helper.convertStringArrayIntoNumArray(await inventoryPage.getPrices());

//         //sort array by prices low to high & compare to page
//         const sortedPrices = await helper.sortNumArrayDescending(pricesArray);
//         const orderMatches = await helper.compareNumArray(pricesArray, sortedPrices);

//         //Expect sorted prices to match order of prices on page
//         await expect(orderMatches, 'Prices should be sorted high to low').toBe(true);
//     });

// });

test.describe("Add and remove inventory items", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)
        await loginPage.login(STANDARD_USER_ID, SAUCE_USER_PASSWORD);
    })

    test('add item to cart', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);

        //add one item to cart
        await inventoryPage.addToCart('sauce labs backpack');
        
        //Expect the cart badge to display one item
        const backpackRemove = await inventoryPage.getRemoveButton('sauce labs backpack');
        const cartCount = await inventoryPage.getCartCount();
        
        await expect(backpackRemove, 'Sauce Labs Backpack item remove button should be visible').toBeEnabled();
        await expect(cartCount, 'Cart should contain one item').toEqual("1");
        
    })
})