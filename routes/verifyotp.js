const User = require('../models/user')
const otp = require('./forgotpassword')
const express = require('express')
const router = express.Router()

router.post('/verifyotp', (req, res) => {
    const input = req.body.otp
    if(input === otp){
        res.send('Correct')
    }else {
        res.send('OTP is incorrect')
    }
})


module.exports = router
