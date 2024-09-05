import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login-page';
import { DashboardPage } from './pages/dashboard-page';

test.describe('Test suite 01', () => {
  test('perform login and logout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`);
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
    
    //await dashboardPage.goToRoomView();
    //await dashboardPage.goToClientView();
    //await dashboardPage.goToBillsView();
    await dashboardPage.goToReservationView();
    
    await page.waitForTimeout(1000);
});
});
