const chai = require('chai')
const chaiHttp = require('chai-http');


const should = chai.should();

const {
    app,
} = require('../server');

chai.use(chaiHttp);

describe('posts', function () {

    it('should show content', function (done) {
        return chai.request(app)
            .get('/dashboard')
            .then(function (res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.length.should.be.above(0);
                res.body.forEach(function (item) {
                    item.should.be.a('object');
                    item.should.have.all.keys(
                        'id', 'date', 'location', 'text');
                });
                done();
            });

    });


    it('add a new post', function (done) {
        const posts = {
            date: '09/1/2019',
            location: 'USA',
            text: 'YAY',
        };
        return chai.request(app)
            .post('/posts/new')
            .send(posts)
            .then(function (res) {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.include.keys('id', 'date', 'location', 'text',);
                res.body.id.should.not.be.null;
                res.body.should.deep.equal(Object.assign(posts, {
                    id: res.body.id
                }));
                done();   
            });

    });

    it('should update posts', function (done) {
        const updateData = {
            date: '09/1/2019',
            location: 'USA',
            text: 'YAY'
        };
        return chai.request(app)
            .get('/dashboard')
            .then(function (res) {
                updateData.id = res.body[0].id;
                return chai.request(app)
                    .put(`/dashboard/${updateData.id}`)
                    .send(updateData)
            })
            .then(function (res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.deep.equal(updateData);
                done();
            });
            

    });
    it('should delete posts', function (done) {
        return chai.request(app)
            .get('/dashboard')
            .then(function (res) {
                return chai.request(app)
                    .delete(`/dashboard/${res.body[0].id}`);
            })
            .then(function (res) {
                res.should.have.status(204);
                done();
            });
        
        
    });


});