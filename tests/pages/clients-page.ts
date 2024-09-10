import { type Locator, type Page } from '@playwright/test';

export class ClientsPage {
    readonly page: Page;
    readonly pageUrl: String;
    readonly pageHeading: Locator;
    readonly createClientButton: Locator;
    readonly clientElements: Locator;
    readonly firstClientInList: Locator;
    readonly clientOptionsButton: Locator;
    readonly editClientButton: Locator;
    readonly deleteClientButton: Locator;
    readonly backButton: Locator;
    
    constructor(page: Page){
        this.page = page;
        this.pageUrl = (`${process.env.BASE_URL}/clients`);
        this.pageHeading = page.getByText('Clients', {exact: true});
        this.createClientButton = page.getByRole('link', { name: 'Create Client' });
        this.clientElements = page.locator('#app > div > div.clients > div.card.client');
        this.firstClientInList = page.locator('#app > div > div.clients > div:nth-child(1) > div:nth-child(2)');
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