import { RoomsPage } from './pages/rooms-page';
import { CreateRoomPage } from './pages/createRoom-page';
import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login-page';
import { DashboardPage } from './pages/dashboard-page';
import { BillRoomPage } from './pages/billsroom-page';
import { EditBillPage } from './pages/editBill-page';
import { ReservationsPage } from './pages/reservations-page';
import { CreateReservationPage } from './pages/createReservation-page';
import { EditClientPage } from './pages/editClient-page';
import { ClientPage } from './pages/clients-page';

test.describe('Test suite 02', () => {
  test('Perform login and logout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`);
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();

    await dashboardPage.performLogout();
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();

    await page.waitForTimeout(1000);
 });

 test('Perform login with wrong credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.performLogin(`random`, `answer`);
  await page.waitForTimeout(1000);
  await expect(page.getByText('Bad username or password')).toBeVisible();
  await page.waitForTimeout(1000);

 });

 test('Navigate from Dashboards', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const reservationsPage = new ReservationsPage(page);
    const roomsPage = new RoomsPage(page);
    const clientPage = new ClientPage(page);
    const billsPage = new BillRoomPage(page);

    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`);
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();

    await dashboardPage.goToClientView();
    await clientPage.goBackFromClientView();
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();

    await dashboardPage.goToBillsView();
    await billsPage.goBackFromBillView();
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();

    await dashboardPage.goToRoomView();
    await roomsPage.goBackFromRoomsView();
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();

    await dashboardPage.goToReservationView();
    await reservationsPage.goBackFromReservationsPage();
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();

 });
 

  test('Make an reservation', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const reservationsPage = new ReservationsPage(page);
    const createReservationPage = new CreateReservationPage(page);
    
    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`);
    await page.waitForTimeout(1000)

    await dashboardPage.goToReservationView();
    await expect(page.getByRole('link', { name: 'Create Reservation' })).toBeVisible();

    await reservationsPage.goToCreateReservation();
    await expect(page.getByText('Save')).toBeVisible();

    await createReservationPage.createNewReservation();
    await expect(page.getByRole('link', { name: 'Create Reservation' })).toBeVisible();
});

test('Delete an existing reservation', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const reservationsPage = new ReservationsPage(page);
  
    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`);
    await page.waitForTimeout(1000)
  
    await dashboardPage.goToReservationView();
    await expect(page.getByRole('link', { name: 'Create Reservation' })).toBeVisible();
  
    await reservationsPage.deleteReservation();
    await page.waitForTimeout(1000)
  
  });

test('Edit existing Bill', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const billRoomPage = new BillRoomPage(page);
  const editBillPage = new EditBillPage(page);

  await loginPage.goto();
  await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`);
  await page.waitForTimeout(1000)

  await dashboardPage.goToBillsView();
  await page.waitForTimeout(1000);
  await expect(page.getByText('Bills')).toBeVisible();

  await billRoomPage.goToEditBill();
  await editBillPage.editBill();
  await expect(page.getByRole('link', { name: 'Create Bill' })).toBeVisible();
  await page.waitForTimeout(1000);

});

test('Edit client', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const clientpage = new ClientPage(page);
  const editClient = new EditClientPage(page);

  await loginPage.goto();
  await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`);
  await page.waitForTimeout(1000)

  await dashboardPage.goToClientView();
  await expect(page.getByRole('link', { name: 'Create Client' })).toBeVisible();

  await clientpage.goToEditClient();
  await expect(page.getByText('Client:')).toBeVisible();
  
  await editClient.editClient();
  await expect(page.getByRole('link', { name: 'Create Client' })).toBeVisible();
  await page.waitForTimeout(1000)

});

test('Delete client', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const clientpage = new ClientPage(page);

  await loginPage.goto();
  await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`);
  await page.waitForTimeout(1000)

  await dashboardPage.goToClientView();
  await expect(page.getByRole('link', { name: 'Create Client' })).toBeVisible();
  await clientpage.deleteClient();
  await expect(page.getByRole('link', { name: 'Create Client' })).toBeVisible();

});
test('Delete bill throu Editview', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const billRoomPage = new BillRoomPage(page);
  const editBillPage = new EditBillPage(page);

  await loginPage.goto();
  await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`);
  await page.waitForTimeout(1000)

  await dashboardPage.goToBillsView();
  await page.waitForTimeout(1000);
  await expect(page.getByText('Bills')).toBeVisible();

  await billRoomPage.goToEditBill();
  await editBillPage.deleteBill()
  await expect(page.getByRole('link', { name: 'Create Bill' })).toBeVisible();
  await page.waitForTimeout(1000);

  })
});