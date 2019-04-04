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
  it('it should list all accounts', (done) => {
    chai.request(app)
      .get('/api/v1/accounts')
      .end((err, res) => {
        res.should.have.status(200);
        assert.equal(res.body.status, 200);
        assert.isArray(res.body.data);
        done();
      });
  });
  it('it should get a single account using account number', (done) => {
    chai.request(app)
      .get('/api/v1/accounts/8030000001')
      .end((err, res) => {
        res.should.have.status(200);
        assert.equal(res.body.status, 200);
        assert.isObject(res.body.data);
        done();
      });
  });
  it('it should throw error for wrong account number', (done) => {
    chai.request(app)
      .get('/api/v1/accounts/8030000004')
      .end((err, res) => {
        res.should.have.status(404);
        assert.equal(res.body.status, 404);
        assert.equal(res.body.error, 'Account not found');
        done();
      });
  });
  it('it should update an account status', (done) => {
    chai.request(app)
      .patch('/api/v1/accounts/8030000001')
      .send({
        status: 'active',
      })
      .end((err, res) => {
        res.should.have.status(201);
        assert.equal(res.body.status, 201);
        assert.isObject(res.body.data);
        done();
      });
  });
  it('it should throw error for wrong status value', (done) => {
    chai.request(app)
      .patch('/api/v1/accounts/8030000001')
      .send({
        status: 'wrong',
      })
      .end((err, res) => {
        res.should.have.status(422);
        assert.equal(res.body.status, 422);
        assert.equal(res.body.error, 'Status should either be active or dormant');
        done();
      });
  });
  it('it should delete an account', (done) => {
    chai.request(app)
      .delete('/api/v1/accounts/8030000001')
      .end((err, res) => {
        res.should.have.status(201);
        assert.equal(res.body.status, 201);
        assert.equal(res.body.message, 'Account deleted successfully');
        done();
      });
  });
});
describe('Test for transactions endpoints', () => {
  it('it should credit a user account', (done) => {
    chai.request(app)
      .post('/api/v1/transactions/8030000002/credit')
      .send({
        amount: 3000,
        cashier: 2,
      })
      .end((err, res) => {
        res.should.have.status(201);
        assert.equal(res.body.status, 201);
        assert.isObject(res.body.data);
        done();
      });
  });
});
