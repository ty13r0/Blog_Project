const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const postSchema = new Schema({
    text: String,
    date: String,
    location: String
}, {
  collection: 'Posts'
});

const Posts = mongoose.model('Posts', postSchema);


const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', UserSchema);

UserSchema.methods.serialize = function() {
  return {
    username: this.username || '',
  };
};

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

module.exports = {
User,
Posts
};