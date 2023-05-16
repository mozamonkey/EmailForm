const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  firstName: { 
        type: String,
        required: true,
        maxlength: 25 
    },
  lastName: { 
        type: String,
        required: true,
        maxlength: 25 
    },
  email: { 
        type: String, 
        required: true, 
        maxlength: 50 
    },
  message: { 
        type: String, 
        required: true, 
        maxlength: 500 
    }
});

module.exports = mongoose.model('Contact', ContactSchema);
