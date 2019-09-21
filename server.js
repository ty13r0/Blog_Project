require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const passport = require('passport');
const cors = require('cors');
const User = require('./models');
const PORT  = require('./node-passport/keys');
const DATABASE_URL = require('./node-passport/keys');

const app = express();
app.use(cors())
app.use(morgan('common'));
app.use(bodyParser);
app.use(express.json());

mongoose.Promise = global.Promise;



const UserRouter = require('./routes/users');
const authRouter = require('./node-passport/auth');
const indexRouter = require('./routes/index');
const postsRouter = require('./routes/posts'); 
const localStrategy  = require('./node-passport/auth');
const jwtStrategy = require('./node-passport/auth');
const jwtAuth = passport.authenticate('jwt',{ session: false });

app.use(express.static('public'));
app.use(morgan('common'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(passport.initialize());
app.use(passport.session());
passport.use('passport-local', localStrategy);
passport.use('passport-jwt', jwtStrategy);

app.get("/", (request, response) => {
  response.sendFile(__dirname + '/public/index.html');
});

app.get('/dashboard', jwtAuth, (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'home.html'));
  });

  app.use('*', (req, res) => {
    return res.status(404).json({ message: 'Not Found' });
  });


  


app.use('/', indexRouter);
app.use('/login', authRouter);
app.use('/register', UserRouter);
app.use('/posts/new', postsRouter);
app.use('/about', indexRouter);
app.use('/dashboard', indexRouter);
app.use('/logout', indexRouter);




app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  if (req.method === "OPTIONS") {
    return res.send(204);
  }
  next();
});

let server;

function serverRun( databaseUrl = DATABASE_URL, port = PORT) {
  console.log(databaseUrl);
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, {useNewUrlParser: true}, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your App is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);  
      });
    });
  });
}

function endServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Ending Server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
  }
  if (require.main === module) {
    serverRun().catch(err => console.error(err));
  };
  module.exports = {
    serverRun,
    app,
    endServer
  };
