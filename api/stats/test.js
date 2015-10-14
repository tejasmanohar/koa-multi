
import request from 'supertest';
import api from '../..';

describe('GET /stats', () => {
  it('should respond with stats', (done) => {
    const app = api();

    request(app.listen())
      .get('/stats')
      .expect({
        requests: 100000,
        average_duration: 52,
        uptime: 123123132
      })
      .end(done);
  })
})

describe('GET /stats/:name', () => {
  it('should respond with a single stat', (done) => {
    const app = api();

    request(app.listen())
      .get('/stats/requests')
      .expect('100000', done);
  })
})
