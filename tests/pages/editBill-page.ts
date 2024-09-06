import { expect, type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';


export class EditBillPage {

    readonly page: Page;
    readonly pageTitle: Locator;
    readonly valueInputField: Locator;
    readonly paidCheckBox: Locator;
    readonly deleteBillButton: Locator;
    readonly backButton: Locator;
    readonly saveBillButton: Locator;

    constructor(page: Page) {
        this.page=page;
        this.pageTitle=page.getByText('Bill:');
        this.valueInputField=page.getByRole('spinbutton');
        this.paidCheckBox=page.locator('.checkbox');
        this.saveBillButton=page.getByText('Save');
        this.deleteBillButton=page.getByText('Delete');
        this.backButton=page.getByRole('link', { name: 'Back' });

    }

    async editBill(){

        const randomAmount = faker.finance.amount({ min: 1000, max: 10000, dec: 0 });

        await this.valueInputField.fill(randomAmount);
        await this.paidCheckBox.click();
        await this.saveBillButton.click();
       
    
    }
    async goBackFromEditBill(){
        await this.backButton.click();
    }
    async deleteBill(){
        await this.deleteBillButton.click();
    }
}

