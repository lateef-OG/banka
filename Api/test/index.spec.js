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
