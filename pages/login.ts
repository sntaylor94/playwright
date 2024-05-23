import {expect, type Page, type Locator } from '@playwright/test';
import { InventoryPage } from './inventory';

export class LoginPage {

    readonly page: Page;
    readonly loginURL: string;
    readonly usernameField: Locator;
    readonly passwordField: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginURL = "https://www.saucedemo.com";
        this.usernameField = page.getByTestId('username');
        this.passwordField = page.getByTestId('password');
        this.loginButton = page.getByTestId('login-button');
    }

    async gotoLogin() {
        await this.page.goto(this.loginURL);
    }

    async login(username: string, password: string) {
        const inventoryPage = new InventoryPage(this.page)
        await this.gotoLogin();
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginButton.click();
        await this.page.waitForURL(inventoryPage.inventoryURL)

    }
    
}