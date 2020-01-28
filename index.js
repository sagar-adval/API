'use strict';

const mongoose = require('mongoose');
const app = require('./app');
const port = process.env.PORT || 3800;
const mongoDb = process.env.MONGODB_URL || 'mongodb://localhost:27017/Sharda';

mongoose.connect(mongoDb, { useNewUrlParser: true })
.then(() => {
    console.log('DB: Connect OK!');
    app.listen(port, () => {
        console.log('Server running on => http://localhost:' + port);
    });
})
.catch(err => console.log(err));

// this node.js code put into app.js

const request = require('request')

request('http://ip-api.com/json/' , function(error, res, body) {
    var ipuser = JSON.parse(body)
    console.log(ipuser.lat + ", " + ipuser.lon)
})


console.log('Starting...');
