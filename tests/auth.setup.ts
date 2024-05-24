import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../pages/login';

const authFile = '../../.auth/user.json'

const STANDARD_USER_ID = "standard_user";
const SAUCE_USER_PASSWORD = "secret_sauce";

setup('authenticate user', async({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLogin();
    await loginPage.login(process.env.STANDARD_USER_ID!, process.env.SAUCE_USER_PASSWORD!);

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    await page.context().storageState({ path: authFile });
});