const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const router = express.Router();

const Contact = require('../models/contact');

//connecting the pages 
router.get('/',(req,res)=>{
    res.render('index');
});

router.get('/code-editor', (req, res) =>{
    res.render('code-editor');
});
router.get('/contact', (req, res) =>{
    res.render('contact');
});
router.get('/help', (req, res) =>{
    res.render('help');
});
router.post('/successfullySent', (req, res) =>{
    res.render('successfullySent');
});
router.post('/submitContact', (req, res) => {
    //use schema model
    const date = new Date().toLocaleString();
    const contact = new Contact({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        subject: req.body.subject,
        comment: req.body.comment,
        date: date
    });

    contact.save()
        .then(result => {
            res.render('submitContact', { contact: contact });
        })
        .catch(err => console.log(err))
});


module.exports = router;