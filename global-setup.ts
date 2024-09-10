import { type FullConfig } from '@playwright/test';
import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

const locale = 'sv-SE';
const test_username = process.env.TEST_USERNAME;
const test_password = process.env.TEST_PASSWORD;
const base_api = process.env.BASE_API;

async function globalSetup(config: FullConfig) {
    // get access token
  const response = await fetch(`${base_api}/login`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      'username': test_username,
      'password': test_password
    }),

  });
  expect(response.status).toBe(200);
  const data = await response.json();
  const userName = data.username;
  const accessToken = data.token;

  // ---------------------------

  // create 10 new clients
  for (let i = 0; i < 10; i++) {
    const fullName = faker.person.fullName();
    const emailAddress = faker.internet.email();
    const phoneNumber = faker.phone.number();
    const newClientResponse = await fetch(`${base_api}/client/new`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'x-user-auth': JSON.stringify({
          'username': userName,
          'token': accessToken
        })
      },
      body: JSON.stringify({
        'name': fullName,
        'email': emailAddress,
        'telephone': phoneNumber
      })
    });
    expect(newClientResponse.status).toBe(200);
  };

  // ---------------------------

  // create 10 new bills
  for (let i = 0; i < 10; i++) {
    const value = faker.finance.amount({ min: 1000, max: 10000, dec: 0 });
    const available = Boolean(Math.random() < 0.5);
    // console.log(available);
    const newBillResponse = await fetch(`${base_api}/bill/new`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'x-user-auth': JSON.stringify({
          'username': userName,
          'token': accessToken
        })
      },
      body: JSON.stringify({
        'value': value,
        'paid': available
      })
    });
    expect(newBillResponse.status).toBe(200);
  };

  // ---------------------------

  // create 10 new rooms
  for (let i = 0; i < 10; i++) {
    let floorNumber = faker.number.int({ min: 1, max: 20 }).toString();
    let roomNumber = faker.number.int({ min: 1, max: 9 }).toString();
    let roomPrice = faker.finance.amount({ min: 1000, max: 30000, dec: 0 });
    const typeOptions = ['double', 'single', 'twin'];
    const numberOfTypeOptions = typeOptions.length;
    const randomType = faker.number.int({ min: 0, max: (numberOfTypeOptions - 1) });
    let featureOptions = ['balcony', 'ensuite', 'sea view', 'penthouse'];
    const numberOfFeatureOptions = featureOptions.length;
    let numberOfFeatures = faker.number.int({ min: 1, max: numberOfFeatureOptions });
    let roomFeatures: any[] = [];
    for (let i = 0; i < (numberOfFeatures); i++) {
      let randomFeature = faker.number.int({ min: 0, max: (featureOptions.length - 1) });
      roomFeatures.push(featureOptions[randomFeature]);
      featureOptions.splice(randomFeature, 1);
    }
    const newRoomResponse = await fetch(`${base_api}/room/new`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'x-user-auth': JSON.stringify({
          'username': userName,
          'token': accessToken
        })
      },
      body: JSON.stringify({
        'available': true,
        'category': randomType,
        'features': roomFeatures,
        'floor': floorNumber,
        'number': (floorNumber + 0 + roomNumber),
        'price': roomPrice
      })
    });
    expect(newRoomResponse.status).toBe(200);
  }

  // ---------------------------

  // create 10 new reservations

  //  ----------> get clients <----------
  const getClientsResponse = await fetch(`${base_api}/clients`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'x-user-auth': JSON.stringify({
        'username': userName,
        'token': accessToken
      })
    }
  });
  expect(getClientsResponse.status).toBe(200);
  const clientsData = await getClientsResponse.json();
  let clientOptions: any [] = [];
  clientsData.forEach(item => {
    clientOptions.push(item.id);
  });
  const numberOfClientOptions = clientOptions.length;

  //  ----------> get rooms  <----------
  const getRoomsResponse = await fetch(`${base_api}/rooms`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'x-user-auth': JSON.stringify({
        'username': userName,
        'token': accessToken
      })
    }
  });
  expect(getRoomsResponse.status).toBe(200);
  const roomsData = await getRoomsResponse.json();
  let roomOptions: any [] = [];
  roomsData.forEach(item => {
    roomOptions.push(item.id);
  });
  const numberOfRoomOptions = roomOptions.length;

  //  ----------> get bills <----------
  const getBillsResponse = await fetch(`${base_api}/bills`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'x-user-auth': JSON.stringify({
        'username': userName,
        'token': accessToken
      })
    }
  });
  expect(getBillsResponse.status).toBe(200);
  const billsData = await getBillsResponse.json();
  let billOptions: any [] = [];
  billsData.forEach(item => {
    billOptions.push(item.id);
  });
  const numberOfBillOptions = billOptions.length;

  //  ----------> create the reservations <----------
  for (let i = 0; i < 10; i++) {
    const randomStartDate = faker.date.soon({ days: 365}).toLocaleDateString(locale);
    const randomEndDate = faker.date.soon({ days: 10, refDate: randomStartDate}).toLocaleDateString(locale);
    const randomClientNumber = faker.number.int({ min: 1, max: (numberOfClientOptions-1)});
    const randomRoomNumber = faker.number.int({ min: 1, max: (numberOfRoomOptions-1)});
    const randomBillNumber = faker.number.int({ min: 1, max: (numberOfBillOptions-1)});
    const newReservationResponse = await fetch(`${base_api}/reservation/new`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'x-user-auth': JSON.stringify({
          'username': userName,
          'token': accessToken
        })
      },
      body: JSON.stringify({
        'start': randomStartDate,
        'end': randomEndDate,
        'client': randomClientNumber,
        'room': randomRoomNumber,
        'bill': randomBillNumber
      })
    });
    expect(newReservationResponse.status).toBe(200);
  };
};

export default globalSetup;