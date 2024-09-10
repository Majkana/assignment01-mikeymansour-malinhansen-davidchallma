import {expect, type Locator, type Page} from '@playwright/test';

export class LoginPage {
    //Attributes
    readonly page: Page;
    readonly pageHeading: Locator;
    readonly usernameInputField: Locator; 
    readonly passwordInputField: Locator;
    readonly loginButton: Locator;
  
    //Const
    constructor(page: Page) {
      this.page = page;
      this.pageHeading = page.getByRole('heading', { name: 'Login' });
      this.usernameInputField = page.locator('input[type="text"]');
      this.passwordInputField = page.locator('input[type="password"]');
      this.loginButton = page.getByRole('button', { name: 'Login' });
    };
  
    // Methods / functions
    async goto() {
      await this.page.goto(`${process.env.BASE_URL}`);
    };
  
    async performLogin(username: string, password:string) {
      //fill out the form - 2 textfields and click the submit button
      await this.usernameInputField.fill(username);
      await this.passwordInputField.fill(password);
      await this.loginButton.click();
    };
  }