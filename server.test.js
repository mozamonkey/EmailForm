const request = require('supertest');
const app = require('./server');
const mongoose = require('mongoose');

beforeAll(done => {
  done()
})

afterAll(done => {
  mongoose.connection.close()
  done()
})

describe('POST /api/contacts', () => {
  it('responds with json', async () => {
    const response = await request(app)
      .post('/api/contacts')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        message: 'Hello, World!'
      })
      .set('Accept', 'application/json');
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('message', 'Success');
    });
  });
  