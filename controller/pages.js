const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const router = express.Router();

//connecting the pages 
router.get('/',(req,res)=>{
    res.render('index');
});

router.get('/code-editor', (req, res) =>{
    res.render('code-editor');
});
router.get('/contact-us', (req, res) =>{
    res.render('contact-us');
});



module.exports = router;