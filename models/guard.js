const mongoose = require('mongoose');

const GuardSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    alt_address: {
        type: String,
        required: true
    },
    phone_no: {
        type: String,
        required: true
    },
    alt_phone_no: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("guard", GuardSchema);