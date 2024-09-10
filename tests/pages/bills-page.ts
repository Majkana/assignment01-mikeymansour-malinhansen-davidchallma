import { expect, type Locator, type Page } from '@playwright/test';

export class BillsPage {

    readonly page: Page;
    readonly pageHeading: Locator;
    readonly billOptionsButton: Locator;
    readonly editBillButton: Locator;
    readonly deleteBillButton: Locator;
    readonly backButton: Locator;

constructor(page: Page){
    this.page = page;
    this.pageHeading = page.getByText('Bills');
    this.billOptionsButton = page.getByRole('img').first();
    this.editBillButton = page.getByText('Edit');
    this.deleteBillButton = page.getByText('Delete');
    this.backButton = page.getByRole('link', { name: 'Back' });
};

async goToEditBill(){
    await this.billOptionsButton.click();
    await this.editBillButton.click();
};

async deleteBill(){
    await this.billOptionsButton.click();
    await this.deleteBillButton.click();
};

async goBackFromBillsView(){
    await this.backButton.click();
};
};