const request = require('supertest');
const httpStatus = require('http-status');
const app = require('../../../src/app');

describe('Main routes', () => {
  test('Get main route /', async () => {
    const response = await request(app)
      .get('/')
    expect(response.statusCode).toBe(httpStatus.OK);
  });
});