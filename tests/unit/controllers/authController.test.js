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

  test('Register - incorect input', async () => {
    const response = await request(app)
      .post('/auth/register')
      .set('Content-type', 'application/json')
      .send({ username: 'incorect_user' });
    expect(response.statusCode).toBe(httpStatus.BAD_REQUEST);
  });

  test('Register - correct input', async () => {
    const response = await request(app)
      .post('/auth/register')
      .set('Content-type', 'application/json')
      .send(defaultNewUser);
    expect(response.statusCode).toBe(httpStatus.CREATED);
  });

  test('Login - invalid credential', async () => {
    const response = await request(app)
      .post('/auth/login')
      .set('Content-type', 'application/json')
      .send({ identity: 'incorect@gmail.com', password: '12341213' });
    expect(response.statusCode).toBe(httpStatus.UNAUTHORIZED);
  });

  test('Login - correct credential', async () => {
    const response = await request(app)
      .post('/auth/login')
      .set('Content-type', 'application/json')
      .send(defaultUser);
    expect(response.statusCode).toBe(httpStatus.OK);
  });
});