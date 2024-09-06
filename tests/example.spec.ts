import { RoomsPage } from './pages/rooms-page';
import { CreateRoomPage } from './pages/createRoom-page';
import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login-page';
import { DashboardPage } from './pages/dashboard-page';
import { BillRoomPage } from './pages/billsroom-page';
import { EditBillPage } from './pages/editBill-page';

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

  test('login and create room', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const roomsPage = new RoomsPage(page);
    const billRoomPage = new BillRoomPage(page);
    const createRoomPage = new CreateRoomPage(page);
    const editBillPage = new EditBillPage(page);
    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`);
    // await page.locator('input[type="text"]').fill(`${process.env.TEST_USERNAME}`);
    // await page.locator('input[type="password"]').fill(`${process.env.TEST_PASSWORD}`);
    // await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForTimeout(1000);
    await expect(page.locator('#app > header > div > div > span')).toContainText(`${process.env.TEST_USERNAME}`);
    // go to rooms page
    await dashboardPage.goToBillsView();
    await billRoomPage.goToEditBill();
    await editBillPage.editBill();
    await page.waitForTimeout(1000);
    // await page.locator('#app > div > div > div:nth-child(1) > a').click();
    //await expect(page.getByText('Rooms')).toHaveText('Rooms');
    // go to create room page
    //await roomsPage.goToCreateRoom();
    //await createRoomPage.createNewRoom(); 
    await page.waitForTimeout(1000);
  });

});