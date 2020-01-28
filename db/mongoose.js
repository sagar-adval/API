const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/MechanicAPI').then(() => console.log('Now connected to Database'))
    .catch(err => console.error('Something went wrong', err));

module.exports = {mongoose}
