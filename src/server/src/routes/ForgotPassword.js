const express = require('express');
const router = express.Router();
const pool = require("../config/db.js");
const nodemailer = require('nodemailer'); /* npm install nodemailer */
const crypto = require('crypto'); /* npm install crypto */

// Verification for password change
router.post("/forgot-password", async (req, res) => {
    const db = await pool.getConnection();

    const email = req.body.email;
    const token = crypto.randomBytes(32).toString('hex');

    if (email == null) { return res.json({ status: 'ok' }); } // security measure to make sure even if password is blank (work on email)

    // expires reset tokens that were previously set for the user
    try {
        const result = await db.execute("UPDATE resettokens SET used = 1 WHERE email = ?", [email]);

        if (result) {
            console.log(result)
        }
    } catch (err) {
        console.log(err);
    }

    // expires reset tokens that were previously set for the user
    // db.query(
    //     "UPDATE resettokens SET used = 1 WHERE email = ?",
    //     [email],
    //     (err, result) => {
    //         if (err){
    //             console.log(err);
    //             res.write(JSON.stringify({ err: err }));
    //         }
    //         if (result) {
    //             console.log(result);
    //             // res.status(200).write('expire old reset-tokens in database');
    //         }
    //         res.end();
    //     }
    // )

    const currentDate = new Date(new Date().getTime())
    const expireDate = new Date(new Date().getTime() + (60 * 60 * 1000)) // lasts one hour (token expiration)

    // Save the token and email in your database for later verification
    try {
        const result = await db.execute("INSERT INTO resettokens (email, token, expiration, createdAt, updatedAt, used) VALUES (?,?,?,?,?,?)",
            [email, token, expireDate, currentDate, currentDate, 0]);
        if (result){
            console.log(result);
        }
        db.release(); // NOTE: release without finally keyword to avoid stopping the endpoint prematurely
    } catch (err) {
        console.log(err);
    }     
    
    // db.query(
    //     "INSERT INTO resettokens (email, token, expiration, createdAt, updatedAt, used) VALUES (?,?,?,?,?,?)",
    //     [email, token, expireDate, currentDate, currentDate, 0],
    //     (err, result) => {
    //         if (err) {
    //             console.log(err);
    //             res.write(JSON.stringify({ err: err }));
    //         }
    //         if (result) {
    //             console.log(result);
    //             // res.status(200).write('token set to database');
    //         }
    //         res.end();
    //     }
    // )

    // transporter is the sender email
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'jonathan.r.chau@gmail.com',
            pass: 'glnr wvso wpyw flqd'
        },
    });

    // variable to store what the email consists of
    const mailOptions = {
        to: email,
        subject: 'Email verification',
        text:
            'To reset your password, please click the link below.\n\nhttp://' + 'localhost:3000' + '/reset-password?token=' + encodeURIComponent(token) + '&email=' + email
    };

    // sends email to the requestee
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending verification email.');
        }
        else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Verification email sent.');
        }
    });

});

module.exports = router;
