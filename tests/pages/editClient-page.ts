import { expect, type Locator, type Page } from '@playwright/test';
import { url } from 'inspector';
import { faker, Faker } from '@faker-js/faker';

const randomName = faker.person.fullName();
const randomEmail = faker.internet.email();
const randomTelephone = faker.phone.number();


export class EditClientPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly clientNameTextfield: Locator;
    readonly clientEmailTextfield: Locator;
    readonly clientTelephoneNumbersfield: Locator;
    readonly clientDeleteButton: Locator;
    readonly clientSaveButton: Locator;
    //readonly goBackButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.clientNameTextfield = page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox');
        this.clientEmailTextfield = page.locator('input[type="email"]');
        this.clientTelephoneNumbersfield = page.locator('div').filter({ hasText: /^Telephone$/ }).getByRole('textbox');
        this.clientDeleteButton = page.getByText('Delete');
        this.clientSaveButton = page.getByText('Save')
        //this.goBackButton = page.getByRole('link', { name: 'Back' })
    }

    async editClient(){
        const randomName = faker.person.fullName();
        const randomEmail = faker.internet.email();
        const randomTelephone = faker.phone.number();

        await this.clientNameTextfield.fill(randomName);
        await this.clientEmailTextfield.fill(randomEmail);
        await this.clientTelephoneNumbersfield.fill(randomTelephone);
        await this.clientSaveButton.click();
    }

    async deleteClient(){
        await this.clientDeleteButton.click();
    }

}

