
import request from 'supertest';
import api from '../..';

describe('GET /users', () => {
  it('should respond with users', (done) => {
    const app = api();

    request(app.listen())
    .get('/users')
    .end(function(err, res){
      if (err) return done(err);
      Object.keys(res.body).should.eql(['tobi', 'loki', 'jane']);
      done();
    });
  })
  it('should respond with users/:id', (done) => {
    const app = api();

    request(app.listen())
    .get('/users/jane')
    .end((err, res) => {
      if (err) return done(err);
      Object.keys(res.body).should.eql(['name', 'age', 'species']);
      done();
    });
  })
})
