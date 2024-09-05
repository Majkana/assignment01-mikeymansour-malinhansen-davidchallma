import { expect, type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';
export class RoomsPage {
    readonly page: Page;
    readonly createRoomButton: Locator;
    readonly roomOptionsButton: Locator;
    readonly editRoomButton: Locator;
    readonly deleteRoomButton: Locator;
    readonly backButton: Locator;

    
    constructor(page: Page) {
        const roomNumber = faker.number.int({ min: 1, max: 20 });
        this.page = page;
        this.createRoomButton = page.getByRole('link', { name: 'Create Room' });
        this.roomOptionsButton = page.locator('div:nth-child(2) > .action > img');
        this.editRoomButton = page.locator(`div:nth-child(${roomNumber}) > div.menu > a:nth-child(1)`);
        this.deleteRoomButton = page.locator('div:nth-child(1) > div.menu > a:nth-child(2)');
        this.backButton = page.getByRole('link', { name: 'Back' });
    }
    

    async goToCreateRoom() {
        await this.createRoomButton.click();
    }


    async goBackFromRoomsView() {
        await this.backButton.click();
    }


}