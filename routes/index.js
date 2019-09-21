const express = require('express');
const router = express.Router();
const User = require('../models');
const path = require('path');


router.use(express.static('public'));


router.get('/dashboard', function (req, res)  {
  res.sendFile(path.join(__dirname, '../public', 'home.html'));
});

router.get('/logout', function (req, res) {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});


router.get('/', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
  next();
});

router.get('/about', function (req, res) {
  res.sendFile(path.join(__dirname, '../public', 'about.html'));
});

router.get('/posts/new', function (req, res) {
  res.sendFile(path.join(__dirname, '../public', 'new-posts.html'));
});

module.exports = router;