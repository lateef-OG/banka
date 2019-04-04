/* eslint-env mocha */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';

const { assert } = chai;

chai.use(chaiHttp);
chai.should();

describe('Welcome', () => {
  it('should return a welcome message', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        assert.equal(res.body.message, 'Welcome to Banka API');
        done();
      });
  });
});

describe('Test for authentication endpoints', () => {
  /**
   * test for Signup endpoint
   */
  it('it should create a new user', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'kemi@yahoo.com',
        firstName: 'Kemi',
        lastName: 'Jackson',
        password: 'password',
        type: 'client',
        isAdmin: 'false',
      })
      .end((err, res) => {
        res.should.have.status(201);
        assert.equal(res.body.status, 201);
        assert.isObject(res.body.data);
        done();
      });
  });
  it('it should throw error for missing fields', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        type: '',
        isAdmin: '',
      })
      .end((err, res) => {
        res.should.have.status(422);
        assert.equal(res.body.status, 422);
        assert.equal(res.body.message, 'Some fields are missing.');
        assert.isArray(res.body.errors);
        done();
      });
  });
  it('it should check if email is valid', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'lateefyahoo.com',
        firstName: 'Kemi',
        lastName: 'Jackson',
        password: 'password',
        type: 'client',
        isAdmin: 'false',
      })
      .end((err, res) => {
        res.should.have.status(422);
        assert.equal(res.body.status, 422);
        assert.equal(res.body.message, 'Email provided is not valid');
        done();
      });
  });
  /**
   * test for login endpoint
   */
  it('it should log a user in', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'kemi@yahoo.com',
        password: 'password',
      })
      .end((err, res) => {
        res.should.have.status(200);
        assert.equal(res.body.status, 200);
        assert.isObject(res.body.data);
        done();
      });
  });
  it('it should return error for invalid credentials', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'kemiyahoo.com',
        password: 'password',
      })
      .end((err, res) => {
        res.should.have.status(400);
        assert.equal(res.body.status, 400);
        assert.equal(res.body.message, 'Incorrect email or password');
        done();
      });
  });
});
describe('Test for account endpoints', () => {
  it('it should create an account', (done) => {
    chai.request(app)
      .post('/api/v1/accounts')
      .send({
        owner: 1,
        type: 'savings',
        balance: 20000,
      })
      .end((err, res) => {
        res.should.have.status(201);
        assert.equal(res.body.status, 201);
        assert.isObject(res.body.data);
        done();
      });
  });
});
