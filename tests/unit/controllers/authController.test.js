const request = require('supertest');
const httpStatus = require('http-status');
const app = require('../../../src/app');

describe('Test auth routes', () => {
  const defaultUser = {
    identity: 'lutfailham96@gmail.com',
    password: 'mytens999',
  }

  const defaultNewUser = {
    email: 'lutfailham96@gmail.com',
    password: 'mytens999',
    fullname: 'Ilham L.',
  }

  test('Register', async () => {
    const response = await request(app)
      .post('/auth/register')
      .set('Content-type', 'application/json')
      .send(defaultNewUser);
    expect(response.statusCode).toBe(httpStatus.CREATED);
  });

  test('Login', async () => {
    const response = await request(app)
      .post('/auth/login')
      .set('Content-type', 'application/json')
      .send(defaultUser);
    expect(response.statusCode).toBe(httpStatus.OK);
  });
});