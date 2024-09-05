import { expect, type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class CreateRoomPage {
    readonly page: Page;
    readonly categoryOptions: Locator;
    readonly numberInputField: Locator;
    readonly floorInputField: Locator;
    readonly availableCheckbox: Locator;
    readonly priceInputField: Locator;
    readonly featuresMultipleOptions: Locator;
    readonly backButton: Locator;
    readonly saveButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.categoryOptions = page.getByRole('combobox');
        this.numberInputField = page.locator('div').filter({ hasText: /^Number$/ }).getByRole('spinbutton');
        this.floorInputField = page.locator('div').filter({ hasText: /^Floor$/ }).getByRole('spinbutton');
        this.availableCheckbox = page.locator('.checkbox');
        this.priceInputField = page.locator('div').filter({ hasText: /^Price$/ }).getByRole('spinbutton');
        this.featuresMultipleOptions = page.getByRole('listbox');
        this.backButton = page.getByRole('link', { name: 'Back' });
        this.saveButton = page.getByText('Save');
    }

    async createNewRoom() {
        // generate fake user data
        let floorNumber = faker.number.int({ min: 1, max: 20 }).toString();
        let roomNumber = faker.number.int({ min: 1, max: 9 }).toString();
        let roomPrice = faker.finance.amount({ min: 1000, max: 30000, dec: 0 });
        // fetch category options
        const typeOptions = await this.categoryOptions.locator('option').allInnerTexts();
        // count number of options room category
        const numberOfTypeOptions = typeOptions.length;
        // choose a random category option
        const randomType = faker.number.int({ min: 0, max: (numberOfTypeOptions - 1) });
        // select chosen category option
        await this.categoryOptions.selectOption(typeOptions[randomType].trim());
        // fill out form with fake data
        await this.numberInputField.fill(floorNumber + 0 + roomNumber);
        await this.floorInputField.fill(floorNumber);
        await this.availableCheckbox.click();
        await this.priceInputField.fill(roomPrice);
        // fetch feature options
        let featureOptions = await this.featuresMultipleOptions.locator('option').allInnerTexts();
        // count number of options feature
        const numberOfFeatureOptions = featureOptions.length;
        // choose random number of feature options to select
        let numberOfFeatures = faker.number.int({ min: 1, max: numberOfFeatureOptions });
        // create array for randomly selected features
        let roomFeatures: any[] = [];
        // randomly select features and add to array in loop
        for (let i = 0; i < (numberOfFeatures); i++) {
            let randomFeature = faker.number.int({ min: 0, max: (featureOptions.length-1) });
            roomFeatures.push(featureOptions[randomFeature]);
            featureOptions.splice(randomFeature, 1);
        }
        // select randomly chosen features
        await this.featuresMultipleOptions.selectOption(roomFeatures);
        await this.saveButton.click();
    }

    async goBackFromCreateNewRoom() {
        await this.backButton.click();
    }
}