const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
chai.use(require('chai-datetime'));

const should = chai.should();



const {
    app,
    serverRun,
    endServer
} = require('../server');

const db = require('../node-passport/keys').mongoURI;


chai.use(chaiHttp);


function seedPostsData() {
    const seedData = [];

    for (let i = 1; i <= 10; i++) {
        seedData.push(generatePostsData());
    }
    return posts.insertMany(seedData);
}

function generatePostsData() {
    return {
        date: '08/29/2019',
        location: 'USA',
        text: 'TESTING PARAGRAPH. AWESOME!'
    }
}

function tearDownDb() {
    console.warn('Deleting db...');
    return mongoose.connection.dropDatabase();
}
