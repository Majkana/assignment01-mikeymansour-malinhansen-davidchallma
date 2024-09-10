import { type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class ClientEditPage {
    readonly page: Page;
    readonly pageUrl: String;
    readonly pageHeading: Locator;
    readonly clientNameTextfield: Locator;
    readonly clientEmailTextfield: Locator;
    readonly clientTelephoneNumbersfield: Locator;
    readonly clientDeleteButton: Locator;
    readonly clientSaveButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.pageUrl = (`${process.env.BASE_URL}/client/`);
        this.pageHeading = page.getByText('Client:');
        this.clientNameTextfield = page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox');
        this.clientEmailTextfield = page.locator('input[type="email"]');
        this.clientTelephoneNumbersfield = page.locator('div').filter({ hasText: /^Telephone$/ }).getByRole('textbox');
        this.clientDeleteButton = page.getByText('Delete');
        this.clientSaveButton = page.getByText('Save')
    };

    async editClient(){
        const randomName = faker.person.fullName();
        const randomEmail = faker.internet.email();
        const randomTelephone = faker.phone.number();

        await this.clientNameTextfield.fill(randomName);
        await this.clientEmailTextfield.fill(randomEmail);
        await this.clientTelephoneNumbersfield.fill(randomTelephone);
        await this.clientSaveButton.click();
    };

    async deleteClient(){
        await this.clientDeleteButton.click();
    };
};