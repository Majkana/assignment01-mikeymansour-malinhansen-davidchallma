import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login-page';
import { DashboardPage } from './pages/dashboard-page';
import { RoomsPage } from './pages/rooms-page';
import { RoomCreatePage } from './pages/roomCreate-page';
import { BillsPage } from './pages/bills-page';
import { BillEditPage } from './pages/billEdit-page';
import { ReservationsPage } from './pages/reservations-page';
import { ReservationCreatePage } from './pages/reservationCreate-page';
import { ClientsPage } from './pages/clients-page';
import { ClientEditPage } from './pages/clientEdit-page';
import testSetup from './test-setup';

const test_username: any = process.env.TEST_USERNAME;
const test_password: any = process.env.TEST_PASSWORD;

test.beforeAll(async () => {
  testSetup();
});

test.describe('Test suite 01', () => {
  test('Test 1 - Perform login and logout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.goto();
    await expect(loginPage.usernameInputField).toBeEmpty();
    await expect(loginPage.passwordInputField).toBeEmpty();
    expect(page.url()).toBe(loginPage.pageUrl);

    await loginPage.performLogin(test_username, test_password);
    await expect(dashboardPage.welcomeMessageUser).toContainText(test_username);
    await expect(dashboardPage.pageHeading).toBeVisible();

    await dashboardPage.performLogout();
    await expect(loginPage.pageHeading).toBeVisible();
    expect(page.url()).toBe(loginPage.pageUrl);
  });

  test('Test 2 - Perform login with wrong credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.performLogin('random', 'answer');

    await expect(loginPage.wrongCredetialsMessage).toBeVisible();
    expect(page.url()).toBe(loginPage.pageUrl);
  });

  test('Test 3 - Create new room', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const roomsPage = new RoomsPage(page);
    const roomCreatePage = new RoomCreatePage(page);

    await loginPage.goto();
    await loginPage.performLogin(test_username, test_password);

    await dashboardPage.goToRoomView();
    const roomsBeforeCreate = await roomsPage.roomElements.count();

    await roomsPage.goToCreateRoom();
    await expect(roomCreatePage.pageHeading).toBeVisible();
    expect(roomCreatePage.pageUrl).toBe(page.url());
    await expect(roomCreatePage.numberInputField).toBeEmpty();
    await expect(roomCreatePage.floorInputField).toBeEmpty();
    await expect(roomCreatePage.availableCheckbox).toBeEmpty();
    await expect(roomCreatePage.priceInputField).toBeEmpty();

    await roomCreatePage.createNewRoom();
    await expect(roomsPage.backButton).toBeVisible();
    const roomsAfterCreate = await roomsPage.roomElements.count();
    expect(roomsAfterCreate - roomsBeforeCreate).toEqual(1);

    await dashboardPage.performLogout();
  });

  test('Test 4 - Navigate from Dashboards', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const clientsPage = new ClientsPage(page);
    const billsPage = new BillsPage(page);
    const roomsPage = new RoomsPage(page);
    const reservationsPage = new ReservationsPage(page);

    await loginPage.goto();
    await loginPage.performLogin(test_username, test_password);
    await expect(dashboardPage.pageHeading).toBeVisible();
    expect(page.url()).toBe(dashboardPage.pageUrl);

    await dashboardPage.goToClientView();
    await expect(clientsPage.pageHeading).toBeVisible()
    expect(page.url()).toBe(clientsPage.pageUrl);
    await clientsPage.goBackFromClientView();
    await expect(dashboardPage.pageHeading).toBeVisible();

    await dashboardPage.goToRoomView();
    await expect(roomsPage.pageHeading).toBeVisible();
    expect(page.url()).toBe(roomsPage.pageUrl);
    await page.goBack();
    await expect(dashboardPage.pageHeading).toBeVisible();

    await dashboardPage.goToBillsView();
    await expect(billsPage.pageHeading).toBeVisible();
    expect(page.url()).toBe(billsPage.pageUrl);
    await billsPage.goBackFromBillsView();
    await expect(dashboardPage.pageHeading).toBeVisible();

    await dashboardPage.goToReservationView();
    await expect(reservationsPage.pageHeading).toBeVisible();
    expect(page.url()).toBe(reservationsPage.pageUrl);
    await reservationsPage.goBackFromReservationsPage();
    await page.goBack();
    await expect(reservationsPage.pageHeading).toBeVisible();
    await page.goForward();
    await expect(dashboardPage.pageHeading).toBeVisible();

    await dashboardPage.performLogout();
  });

  test('Test 5 - Create a new reservation', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const reservationsPage = new ReservationsPage(page);
    const reservationCreatePage = new ReservationCreatePage(page);

    await loginPage.goto();
    await loginPage.performLogin(test_username, test_password);

    await dashboardPage.goToReservationView();
    await expect(reservationsPage.createReservationButton).toBeVisible();
    const reservationsBeforeCreate = await reservationsPage.reservationElements.count();

    await reservationsPage.goToCreateReservation();
    await expect(reservationCreatePage.pageHeading).toBeVisible();
    await expect(reservationCreatePage.saveButton).toBeVisible();
    await expect(reservationCreatePage.startDateField).toBeEmpty();
    await expect(reservationCreatePage.endDateField).toBeEmpty();
    
    await reservationCreatePage.createNewReservation();
    await expect(reservationsPage.backButton).toBeVisible();
    const reservationsAfterCreate = await reservationsPage.reservationElements.count();
    expect(reservationsAfterCreate - reservationsBeforeCreate).toEqual(1);

    await dashboardPage.performLogout();
  });

  test('Test 6 - Delete a reservation via options-button', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const reservationsPage = new ReservationsPage(page);

    await loginPage.goto();
    await loginPage.performLogin(test_username, test_password);

    await dashboardPage.goToReservationView();
    await expect(reservationsPage.createReservationButton).toBeVisible();
    await expect(page.url()).toBe(reservationsPage.pageUrl);
    const reservationsBeforeDelete = await reservationsPage.reservationElements.count();

    await reservationsPage.deleteReservation();
    await expect(reservationsPage.backButton).toBeVisible();
    const reservationsAfterDelete = await reservationsPage.reservationElements.count();
    expect(reservationsBeforeDelete - reservationsAfterDelete).toEqual(1);

    await dashboardPage.performLogout();
  });

  test('Test 7 - Edit a bill', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const billsPage = new BillsPage(page);
    const billEditPage = new BillEditPage(page);

    await loginPage.goto();
    await loginPage.performLogin(test_username, test_password);

    await dashboardPage.goToBillsView();
    const firstBillBeforeEdit = await billsPage.firstBillInList.allTextContents();

    await billsPage.goToEditBill();
    await expect(billEditPage.pageHeading).toBeVisible();
    await expect(page.url()).toContain(billEditPage.pageUrl);
    await billEditPage.editBill();

    await expect(billsPage.backButton).toBeVisible();
    const firstBillAfterEdit = await billsPage.firstBillInList.allTextContents();
    await expect(firstBillAfterEdit).not.toBe(firstBillBeforeEdit);
    await expect(billsPage.createBillButton).toBeVisible();

    await dashboardPage.performLogout();
  });

  test('Test 8 - Edit a client', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const clientsPage = new ClientsPage(page);
    const clientEditPage = new ClientEditPage(page);

    await loginPage.goto();
    await loginPage.performLogin(test_username, test_password);

    await dashboardPage.goToClientView();
    await expect(clientsPage.createClientButton).toBeVisible();
    const firstClientBeforeEdit = await clientsPage.firstClientInList.allTextContents();
 
    await clientsPage.goToEditClient();
    await expect(clientEditPage.pageHeading).toBeVisible();
    await expect(page.url()).toContain(clientEditPage.pageUrl);
    await clientEditPage.editClient();

    await expect(clientsPage.backButton).toBeVisible();
    const firstClientAfterEdit = await clientsPage.firstClientInList.allTextContents();
    await expect(firstClientAfterEdit).not.toBe(firstClientBeforeEdit);
    await expect(clientsPage.createClientButton).toBeVisible();

    await dashboardPage.performLogout();
  });

  test('Test 9 - Delete a client via options-button', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const clientsPage = new ClientsPage(page);

    await loginPage.goto();
    await loginPage.performLogin(test_username, test_password);

    await dashboardPage.goToClientView();
    const clientsBeforeDelete = await clientsPage.clientElements.count();
    console.log(clientsBeforeDelete);

    await clientsPage.deleteClient();
    await expect(clientsPage.backButton).toBeVisible();
    const clientsAfterDelete = await clientsPage.clientElements.count();
    console.log(clientsAfterDelete);
    expect(clientsBeforeDelete - clientsAfterDelete).toEqual(1);

    await dashboardPage.performLogout();
  });

  test('Test 10 - Delete bill through edit view-page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const billsPage = new BillsPage(page);
    const billEditPage = new BillEditPage(page);

    await loginPage.goto();
    await loginPage.performLogin(test_username, test_password);

    await dashboardPage.goToBillsView();
    await expect(billsPage.createBillButton).toBeVisible();
    const billsBeforeDelete = await billsPage.billElements.count();

    await billsPage.goToEditBill();
    await billEditPage.deleteBill()

    await expect(billsPage.backButton).toBeVisible();
    const billsAfterDelete = await billsPage.billElements.count();
    expect(billsBeforeDelete - billsAfterDelete).toEqual(1);

    await dashboardPage.performLogout();
  });
});