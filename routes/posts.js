const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {
    posts
} = require('../models');


router.get('/', function (req, res)  {
    res.json(posts.get());
});

router.post('/', jsonParser, (req, res) => {
    const requiredFields = ['date', 'location', 'text'];
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`
            console.error(message);
            return res.status(400).send(message);
        }
    }

    const item = posts.create(
      req.body.date, 
      req.body.text, 
      req.body.location
      );
    res.status(201).json(item);
});

router.delete('/:id', (req, res) => {
    posts.delete(req.params.id);
    console.log(`Delete blog item \`${req.params.id}\``);
    res.status(204).end();
});

router.put('/:id', jsonParser, (req, res) => {
    const requiredFields = ['date', 'text', 'location', 'id'];
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`
            console.error(message);
            return res.status(400).send(message);
        }
    }

    if (req.params.id !== req.body.id) {
        const message = (`Request path id (${req.params.id}) and request body id `
            `(${req.body.id}) must match`);
        console.error(message);
        return res.status(400).send(message);
    }

    console.log(`Updating blog item \`{req.params.id}\``);
    const updatedItem = posts.update({
        id: req.params.id,
        location: req.body.location,
        text: req.body.text,
        date: req.body.date
    });
    res.status(204).json(updatedItem);
})

module.exports = router;