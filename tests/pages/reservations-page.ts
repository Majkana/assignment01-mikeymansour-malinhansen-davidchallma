import { expect, type Locator, type Page } from '@playwright/test';

export class ReservationsPage {
    readonly page: Page;
    readonly pageHeading: Locator;
    readonly createReservationButton: Locator;
    readonly reservationOptionsButton: Locator;
    readonly reservationDeleteButton: Locator;
    readonly backButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageHeading = page.getByText('Reservations');
        this.createReservationButton = page.getByRole('link', { name: 'Create Reservation' });
        this.reservationOptionsButton = page.getByRole('img').first();
        this.reservationDeleteButton = page.getByText('Delete');
        this.backButton = page.getByRole('link', { name: 'Back' });
    }

    async goToCreateReservation() {
        await this.createReservationButton.click();
    }

    async goBackFromReservationsPage() {
        await this.backButton.click();
    }

    async deleteReservation(){
        await this.reservationOptionsButton.click();
        await this.reservationDeleteButton.click();
    }
}