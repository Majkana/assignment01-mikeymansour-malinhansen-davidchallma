import { type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

const locale = 'sv-SE';

export class CreateReservationPage {
    readonly page: Page;
    readonly startDateField: Locator;
    readonly endDateField: Locator;
    readonly clientSelect: Locator;
    readonly roomSelect: Locator;
    readonly billSelect: Locator;
    readonly saveButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.startDateField = page.locator('div').filter({ hasText: /^Start \(Format YYYY-MM-DD\)$/ }).getByPlaceholder('YYYY-MM-DD');
        this.endDateField = page.locator('div').filter({ hasText: /^End \(Format YYYY-MM-DD\)$/ }).getByPlaceholder('YYYY-MM-DD');
        this.clientSelect = page.locator('#app > div > div:nth-child(2) > div:nth-child(3) > select');
        this.roomSelect = page.locator('#app > div > div:nth-child(2) > div:nth-child(4) > select');
        this.billSelect = page.locator('#app > div > div:nth-child(2) > div:nth-child(5) > select');
        this.saveButton = page.getByText('Save');
    }
    
    async createNewReservation() {
        const randomStartDate = faker.date.soon({ days: 365});
        const randomEndDate = faker.date.soon({ days: 10, refDate: randomStartDate});
        const clientOptions = await this.clientSelect.locator('option').allInnerTexts();
        const numberOfClientOptions = clientOptions.length;
        const randomClient = faker.number.int({ min: 1, max: (numberOfClientOptions-1)});
        // console.log(`Client options: ${clientOptions}`);
        // console.log(`Number of options: ${numberOfClientOptions}`);
        // console.log(`Random client: ${randomClient}`);
        // console.log(randomStartDate.toLocaleDateString(locale));
        // console.log(randomEndDate.toLocaleDateString(locale));
        await this.startDateField.fill(randomStartDate.toLocaleDateString(locale));
        await this.endDateField.fill(randomEndDate.toLocaleDateString(locale));
        await this.clientSelect.selectOption(clientOptions[randomClient]);
        const roomOptions = await this.roomSelect.locator('option').allInnerTexts();
        const numberOfRoomOptions = roomOptions.length;
        const randomRoom = faker.number.int({ min: 1, max: (numberOfRoomOptions-1)});
        // console.log(`Room options: ${roomOptions}`);
        // console.log(`Number of options: ${numberOfRoomOptions}`);
        // console.log(`Random room: ${randomRoom}`);
        await this.roomSelect.selectOption(roomOptions[randomRoom]);
        const billOptions = await this.billSelect.locator('option').allInnerTexts();
        const numberOfBillOptions = billOptions.length;
        const randomBill = faker.number.int({ min: 1, max: (numberOfBillOptions-1)});
        // console.log(`Bill options: ${billOptions}`);
        // console.log(`Number of options: ${numberOfBillOptions}`);
        // console.log(`Random bill: ${randomBill}`);
        await this.billSelect.selectOption(billOptions[randomBill]);
        await this.saveButton.click();
    }

}