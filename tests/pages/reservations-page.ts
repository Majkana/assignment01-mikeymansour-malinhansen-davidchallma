import { expect, type Locator, type Page } from '@playwright/test';

export class ReservationsPage {
    readonly page: Page;
    readonly pageHeading: Locator;
    readonly createReservationButton: Locator;
    readonly backButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageHeading = page.getByText('Reservations');
        this.createReservationButton = page.getByRole('link', { name: 'Create Reservation' });
        this.backButton = page.getByRole('link', { name: 'Back' });
    }

    async goToCreateReservation() {
        await this.createReservationButton.click();
    }

    async goBackFromReservationsPage() {
        await this.backButton.click();
    }

}