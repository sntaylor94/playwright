import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login';

const STANDARD_USER_ID = "standard_user";
const LOCKED_OUT_USER_ID = "locked_out_user"
const SAUCE_USER_PASSWORD = "secret_sauce";


test.describe("Login to Swag Labs" , () => { 

    test.use({ storageState: { cookies: [], origins: [] } })
    
    test('standard user login', async ({ page }) => {
        const loginPage = new LoginPage(page); 
        await loginPage.gotoLogin();
        await loginPage.login(STANDARD_USER_ID, SAUCE_USER_PASSWORD);
        
        // Expect page navigation after successful login
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    test('locked out user login', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.gotoLogin();
        await loginPage.login(LOCKED_OUT_USER_ID, SAUCE_USER_PASSWORD);

        //Expect error reporting user has been locked out
        await expect(page.getByText('Epic sadface: Sorry, this user has been locked out.')).toBeVisible();
    })
});