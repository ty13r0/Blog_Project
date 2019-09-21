 'use strict';

 const chai = require('chai'), chaiHttp = require('chai-http');
 const passport = require('passport');
 const Strategy = require('../node-passport/auth');

 const { 
   User
   } = require('../node-passport/passport');


const app= require('../server');

const { expect } = require('chai');

chai.use(chaiHttp);

let login_details = {
  'username': 'username',
  'password': 'password'
}
 
let register_details = { 
  'username': 'username',
  'password': 'password'
};
 
 
describe('Create Account, Login and Check Token', () => {
  beforeEach((done) => {
    User.remove({}, (err) => {
      console.log(err);
      done();
    })
  });
 
  describe('/POST Register', () => {
    it('it should Register, Login, and check token', (done) => {
      chai.request(app)
        .post('/register')
        .send(register_details) 
        .end((err, res) => { 
        
          res.should.have.status(201);
          expect(res.body.state).to.be.true;
 
          
          chai.request(app)
            .post('/login')
            .send(login_details)
            .end((err, res) => {
              console.log('this was run the login part');
              res.should.have.status(200);
              expect(res.body.state).to.be.true;
              res.body.should.have.property('token'); 
              
              let token = res.body.token;
              chai.request(app)
                .get('/dashboard')
                .set('Authorization', token)
                .end((err, res) => {
                  res.should.have.status(200);
                  expect(res.body.state).to.be.true;
                  res.body.data.should.be.an('object');
 
                  done();
                })
            })
 
        })
    })
  })
})