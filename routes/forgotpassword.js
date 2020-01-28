const express = require('express')
const router = express.Router()
const User = require('../models/user')
const nodemailer = require('nodemailer')
const mongoose = require('mongoose')

const min=1000;
const max=9999;
const otp = Math.floor(Math.random() * (+max - +min)) + +min;


router.post('/', (req, res) => {
    const email = req.body.email

    console.log(email)

    let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            auth: {
                user: 'Zubeengarg555@gmail.com',
                pass: 'Zubeen@123'
            }
        }
    )

    transporter.sendMail({
        from: "Mechanic Tracker",
        to: email,
        subject: 'OTP for resetting password',
        text: `Your OTP for resetting your password is ${otp}`
    })
            res.status(200).send('Mail Sent');

})





module.exports = router, otp
