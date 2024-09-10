import { expect, type Locator, type Page } from '@playwright/test';

export class ClientPage {
    readonly page: Page;
    readonly pageHeading: Locator;
    readonly createClientButton: Locator;
    readonly clientOptionsButton: Locator;
    readonly editClientButton: Locator;
    readonly deleteClientButton: Locator;
    readonly backButton: Locator;
    
    constructor(page: Page){
        this.page = page;
        this.pageHeading = page.getByText('Clients');
        this.createClientButton = page.getByRole('link', { name: 'Create Client' });
        this.clientOptionsButton = page.getByRole('img').first();
        this.editClientButton = page.getByText('Edit');
        this.deleteClientButton = page.getByText('Delete');
        this.backButton = page.getByRole('link', { name: 'Back' });
    };

    async goToCreateClient(){
        await this.createClientButton.click();
    };

    async goToEditClient(){
        await this.clientOptionsButton.click();
        await this.editClientButton.click();
    };

    async deleteClient(){
        await this.clientOptionsButton.click();
        await this.deleteClientButton.click();
    };

    async goBackFromClientView(){
        await this.backButton.click();
    };
};    