import { type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class RoomsPage {
    readonly page: Page;
    readonly pageUrl: String;
    readonly pageHeading: Locator;
    readonly createRoomButton: Locator;
    readonly roomElements: Locator;
    readonly roomOptionsButton: Locator;
    readonly editRoomButton: Locator;
    readonly deleteRoomButton: Locator;
    readonly backButton: Locator;
    
    constructor(page: Page) {
        const roomNumber = faker.number.int({ min: 1, max: 20 });
        this.page = page;
        this.pageUrl = (`${process.env.BASE_URL}/rooms`);
        this.pageHeading = page.getByText('Rooms', {exact: true});
        this.createRoomButton = page.getByRole('link', { name: 'Create Room' });
        this.roomElements = page.locator('#app > div > div.rooms > div.card.room');
        this.roomOptionsButton = page.locator('div:nth-child(2) > .action > img');
        this.editRoomButton = page.locator(`div:nth-child(${roomNumber}) > div.menu > a:nth-child(1)`);
        this.deleteRoomButton = page.locator('div:nth-child(1) > div.menu > a:nth-child(2)');
        this.backButton = page.getByRole('link', { name: 'Back' });
    };

    async goToCreateRoom() {
        await this.createRoomButton.click();
    };

    async goBackFromRoomsView() {
        await this.backButton.click();
    };
};