'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = Schema({
    name: String,
    email: String,
    password: String,
    role: String,
    location: {
        type: { type: String },
        coordinates: [Number, Number]
    }

});

module.exports = mongoose.model('User', UserSchema);
