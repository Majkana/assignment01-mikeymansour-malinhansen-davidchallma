import { type Locator, type Page } from '@playwright/test';

export class DashboardPage {
    // attributes
    readonly page: Page;
    readonly pageHeading: Locator;
    readonly welcomeMessageUser: Locator;
    readonly logoutButton: Locator;
    readonly roomsViewButton: Locator;
    readonly clientsViewButton: Locator;
    readonly billsViewButton: Locator;
    readonly reservationsViewButton: Locator;

    // const
    constructor(page: Page) {
        this.page = page;
        this.pageHeading = page.getByRole('heading', { name: 'Tester Hotel Overview' });
        this.welcomeMessageUser = page.locator('#app > header > div > div > span');
        this.logoutButton = page.getByRole('button', { name: 'Logout' });
        this.roomsViewButton = page.locator('#app > div > div > div:nth-child(1) > a');
        this.clientsViewButton = page.locator('#app > div > div > div:nth-child(2) > a');
        this.billsViewButton = page.locator('#app > div > div > div:nth-child(3) > a');
        this.reservationsViewButton = page.locator('#app > div > div > div:nth-child(4) > a');
    }

    // methods / functions
    async goToRoomView() {
        await this.roomsViewButton.click();
    }

    async goToClientView() {
        await this.clientsViewButton.click();
    }

    async goToBillsView() {
        await this.billsViewButton.click();
    }

    async goToReservationView() {
        await this.reservationsViewButton.click();
    }

    async performLogout() {
        // click logout button
        await this.logoutButton.click();
    }

}