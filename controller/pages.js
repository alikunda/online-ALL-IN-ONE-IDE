const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const router = express.Router();

//connecting the pages 
router.get('/',(req,res)=>{
    res.render('index');
});



module.exports = router;