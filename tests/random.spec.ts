import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { LoginPage } from './pages/login-page';
import { DashboardPage } from './pages/dashboard-page';
import { RoomsPage } from './pages/rooms-page';
import { CreateRoomPage } from './pages/createRoom-page';
import { BillsPage } from './pages/bills-page';
import { EditBillPage } from './pages/editBill-page';
import { ReservationsPage } from './pages/reservations-page';
import { CreateReservationPage } from './pages/createReservation-page';
import { ClientPage } from './pages/clients-page';
import { EditClientPage } from './pages/editClient-page';

const locale = 'sv-SE';
const test_username:any = process.env.TEST_USERNAME;
const test_password:any = process.env.TEST_PASSWORD;

test.describe('Test suite 01', () => {
  test('Test 1 - Create new room', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const roomsPage = new RoomsPage(page);
    const createRoomPage = new CreateRoomPage(page);
    await loginPage.goto();
    await loginPage.performLogin(test_username, test_password);
    await page.waitForTimeout(1000);
    await expect(dashboardPage.welcomeMessageUser).toContainText(test_username);
    await dashboardPage.goToRoomView();
    await expect(roomsPage.pageHeading).toHaveText('Rooms');
    await roomsPage.goToCreateRoom();
    await createRoomPage.createNewRoom();
    await dashboardPage.performLogout();
    await page.waitForTimeout(1000);
});

  test('Test 2 - Perform login and logout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    await loginPage.goto();
    await loginPage.performLogin(test_username, test_password);
    await expect(dashboardPage.pageHeading).toBeVisible();

    await dashboardPage.performLogout();
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();

    await page.waitForTimeout(1000);
  });

  test('Test 3 - Perform login with wrong credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.performLogin('random', 'answer');
    await page.waitForTimeout(1000);
    await expect(page.getByText('Bad username or password')).toBeVisible();
    await page.waitForTimeout(1000);
  });

  test('Test 4 - Navigate from Dashboards', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const clientPage = new ClientPage(page);
    const billsPage = new BillsPage(page);
    const roomsPage = new RoomsPage(page);
    const reservationsPage = new ReservationsPage(page);

    await loginPage.goto();
    await loginPage.performLogin(test_username, test_password);
    await expect(dashboardPage.pageHeading).toBeVisible();

    await dashboardPage.goToClientView();
    await expect(clientPage.pageHeading).toBeVisible()
    await clientPage.goBackFromClientView();
    await expect(dashboardPage.pageHeading).toBeVisible();

    await dashboardPage.goToBillsView();
    await billsPage.goBackFromBillsView();
    await expect(dashboardPage.pageHeading).toBeVisible();

    await dashboardPage.goToRoomView();
    await roomsPage.goBackFromRoomsView();
    await expect(dashboardPage.pageHeading).toBeVisible();

    await dashboardPage.goToReservationView();
    await reservationsPage.goBackFromReservationsPage();
    await expect(dashboardPage.pageHeading).toBeVisible();
  });


  test('Test 5 - Create a new reservation', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const reservationsPage = new ReservationsPage(page);
    const createReservationPage = new CreateReservationPage(page);

    await loginPage.goto();
    await loginPage.performLogin(test_username, test_password);
    await page.waitForTimeout(1000)

    await dashboardPage.goToReservationView();
    await page.waitForTimeout(1000);
    await expect(reservationsPage.createReservationButton).toBeVisible();

    await reservationsPage.goToCreateReservation();
    await expect(createReservationPage.saveButton).toBeVisible();

    await createReservationPage.createNewReservation();
    await expect(reservationsPage.createReservationButton).toBeVisible();
  });

  test('Test 6 - Delete an existing reservation', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const reservationsPage = new ReservationsPage(page);

    await loginPage.goto();
    await loginPage.performLogin(test_username, test_password);
    await page.waitForTimeout(1000)

    await dashboardPage.goToReservationView();
    await page.waitForTimeout(1000);
    await expect(reservationsPage.createReservationButton).toBeVisible();

    await reservationsPage.deleteReservation();
    await page.waitForTimeout(1000)
  });

  test('Test 7 - Edit existing Bill', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const billsPage = new BillsPage(page);
    const editBillPage = new EditBillPage(page);

    await loginPage.goto();
    await loginPage.performLogin(test_username, test_password);
    await page.waitForTimeout(1000)

    await dashboardPage.goToBillsView();
    await page.waitForTimeout(1000);
    await expect(page.getByText('Bills')).toBeVisible();

    await billsPage.goToEditBill();
    await editBillPage.editBill();
    await expect(page.getByRole('link', { name: 'Create Bill' })).toBeVisible();
    await page.waitForTimeout(1000);
  });

  test('Test 8 - Edit client', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const clientpage = new ClientPage(page);
    const editClient = new EditClientPage(page);

    await loginPage.goto();
    await loginPage.performLogin(test_username, test_password);
    await page.waitForTimeout(1000)

    await dashboardPage.goToClientView();
    await expect(page.getByRole('link', { name: 'Create Client' })).toBeVisible();

    await clientpage.goToEditClient();
    await expect(page.getByText('Client:')).toBeVisible();

    await editClient.editClient();
    await expect(page.getByRole('link', { name: 'Create Client' })).toBeVisible();
    await page.waitForTimeout(1000)
  });

  test('Test 9 - Delete client', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const clientpage = new ClientPage(page);

    await loginPage.goto();
    await loginPage.performLogin(test_username, test_password);
    await page.waitForTimeout(1000)

    await dashboardPage.goToClientView();
    await expect(page.getByRole('link', { name: 'Create Client' })).toBeVisible();
    await clientpage.deleteClient();
    await expect(page.getByRole('link', { name: 'Create Client' })).toBeVisible();
  });

  test('Delete bill throu Editview', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const billsPage = new BillsPage(page);
    const editBillPage = new EditBillPage(page);

    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`);
    await page.waitForTimeout(1000)

    await dashboardPage.goToBillsView();
    await page.waitForTimeout(1000);
    await expect(page.getByText('Bills')).toBeVisible();

    await billsPage.goToEditBill();
    await editBillPage.deleteBill()
    await expect(page.getByRole('link', { name: 'Create Bill' })).toBeVisible();
    await page.waitForTimeout(1000);
  });
});