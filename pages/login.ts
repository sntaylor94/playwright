import { type Page, type Locator } from '@playwright/test';
import * as selectors from './../utils/selectors.json'


export class LoginPage {

    readonly page: Page;
    readonly loginURL: string;
    readonly usernameField: Locator;
    readonly passwordField: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginURL = selectors.LoginPage.loginPageURL;
        this.usernameField = page.getByTestId(selectors.LoginPage.username);
        this.passwordField = page.getByTestId(selectors.LoginPage.password);
        this.loginButton = page.getByTestId(selectors.LoginPage.loginButton);
    }

    async gotoLogin() {
        await this.page.goto(this.loginURL);
    }

    async login(username: string, password: string) {
        await this.gotoLogin();
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }
    
}