
//Schema as a model

const mongoose = require('mongoose');

var contactSchema = new mongoose.Schema({

    fname: {
        type: String
    },
    lname: {
        type: String
    },
    email: {
        type: String
    },
    subject: {
        type: String
    },
    comment: {
        type: String
    },
    date:{
        type: String
    }
});
module.exports = mongoose.model('Contact',contactSchema);