import { expect, type Locator, type Page } from '@playwright/test';
import { url } from 'inspector';

export class ClientPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly locationURL: URL; //TÄNK PÅ OM MAN SKA HA DEN HÄR
    readonly createClientButton: Locator;
    readonly clientOptionsButton: Locator;
    readonly editClientButton: Locator;
    readonly deleteClientButton: Locator;
    readonly backButton: Locator;
    
    constructor(page: Page){
        this.page = page;
        this.pageTitle = page.getByText('Clients');
        //this.locationURL = 
        this.createClientButton = page.getByRole('link', { name: 'Create Client' });
        this.clientOptionsButton = page.getByRole('img').first();
        this.editClientButton = page.getByText('Edit');
        this.deleteClientButton = page.getByText('Delete');
        this.backButton = page.getByRole('link', { name: 'Back' });

    }

    async goToCreateClient(){
        await this.createClientButton.click();
    };

    async goToEditClient(){
        await this.clientOptionsButton.click();
        await this.editClientButton.click();
    }

    async deleteClient(){
        await this.clientOptionsButton.click();
        await this.deleteClientButton.click();
    }

    async goBackFromClientView(){
        await this.backButton.click();
    }



}

    