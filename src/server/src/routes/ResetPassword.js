const express = require('express');
const router = express.Router();
const pool = require("../config/db.js");
const bcrypt = require("bcrypt"); /* npm install bcrypt */
const Axios = require('axios'); /*npm install axios */
const cron = require('node-cron'); /* npm install node-cron */
const { isValidPassword } = require('../utils/isValidPassword.js')

const saltRounds = 10;

router.post("/reset-password", async (req, res) => {
    const db = await pool.getConnection();

    const password = req.body.password1;
    const confirmPassword = req.body.password2;

    /* Make sure passwords match */
    if (password !== confirmPassword) {
        return res.json({ status: 'error', message: 'Passwords do not match. Please try again.' });
    }

    /* Ensure password is valid */
    if (!isValidPassword(req.body.password1)) {
        return res.json({ status: 'error', message: 'Password does not meet minimum requirements. Minimum length has to be 8 characters, 1 special character, and 1 number.' });
    }

    var email = req.query.email;
    var token = req.query.token;
    var record;

    // finds a reset token from the database
    try {
        const result = await db.execute("SELECT * FROM ResetTokens WHERE email = ? AND token = ? AND used = 0",
            [email, token]);
        if (result) {
            record = result[0];
            console.log(result[0]);
        }
    } catch (err) {
        console.log("An error has occured (ResetPassword search)")
    }


    // db.query(
    //     "SELECT * FROM ResetTokens WHERE email = ? AND token = ? AND used = 0",
    //     [email, token],
    //     (err, result) => {
    //         if (result) {
    //             record = result;
    //             console.log(result);
    //             // res.send('reset token found from database');
    //         }
    //         if (err) {
    //             console.log("error has occured");
    //         }
    //     }
    // )

    // check if there is a reset token
    if (record === null) {
        return res.json({ status: 'error', message: 'Token not found. Please try the reset password process again.' });
    }

    // updates the token so that it is used
    try {
        const result = await db.execute("UPDATE ResetTokens SET used = 1 WHERE email = ? AND expiration > NOW() AND used = 0",
            [email]);
        if (result) {
            console.log(result);
        }
    } catch (err) {
        console.log("error has occured (ResetPassword update)")
    }

    // db.query(
    //     "UPDATE ResetTokens SET used = 1 WHERE email = ? AND expiration > NOW() AND used = 0",
    //     [email],
    //     (err, result) => {
    //         if (result) {
    //             console.log(result);
    //             // res.send('reset token found from database');
    //         }
    //         if (err) {
    //             console.log("error has occured");
    //         }
    //     }
    // )

    // updates user's password
    try {
        bcrypt.hash(password, saltRounds, async (err, hash) => {
            if (err) {
                console.log(err);
            }

            const result = await db.execute("UPDATE users SET password = ? WHERE email = ?",
                [hash, email]);
    
            if (result) {
                res.send(result[0].message);
            }
        })
    } catch (err) {
        console.log(err);
    } finally {
        db.release();
    }
    
    // bcrypt.hash(password, saltRounds, (err, hash) => {
    //     if (err) {
    //         console.log(err);
    //     }
    //     db.query(
    //         "UPDATE users SET password = ? WHERE email = ?",
    //         [hash, email],
    //         (err, result) => {
    //             if (result) {
    //                 res.send(result.message);
    //             }
    //             if (err) {
    //                 console.log(err);
    //             }
    //         }
    //     );
    // })

})

// get request for the email address of the current user
router.get("/reset-password", async (req, res) => {
    const db = await pool.getConnection();

    var token = req.query.token;

    // tries to find the token of the current user (not tested properly yet)
    try {
        const result = await db.execute("SELECT * FROM ResetTokens WHERE token = ? AND (expiration > NOW() AND used = 0)",
            [token]);
            
        if (result) {
            console.log(result);
            res.json({ info: result[0] })
        }
    } catch (err) {
        console.log(err)
    } finally {
        db.release();
    }

    // db.query(
    //     "SELECT * FROM ResetTokens WHERE token = ? AND (expiration > NOW() AND used = 0)",
    //     [token],
    //     (err, result) => {
    //         console.log(result);
    //         if (err) {
    //             console.log("error has occured");
    //         }
    //         if (result) {
    //             console.log(result);
    //             res.json({ info: result });
    //         }
    //     }
    // )
})

/**
 * deletes all expired reset tokens from the database
 */
const delResetTokens = async () => {
    const db = await pool.getConnection();

    try {
        var deletedRows;

        // deletes expired tokens from the database
        const result = await db.execute("DELETE FROM ResetTokens WHERE expiration < NOW() OR used = 1");
        deletedRows = result[0].affectedRows;
        console.log(deletedRows)

        // db.query("DELETE FROM ResetTokens WHERE expiration < NOW() OR used = 1",
        //     [],
        //     (err, result) => {
        //         if (err) {
        //             console.log(err.message);
        //         }
        //         if (result) {
        //             deletedRows = result.affectedRows;
        //             console.log(deletedRows);
        //         }
        //     }
        // );

        // Process the response or perform additional actions
        console.log('Tokens reset: ' + deletedRows); // MINOR BUG: CAN'T SEEM TO GET DATA FROM AFFECTED ROWS
    } catch (error) {
        console.error('Error resetting tokens:', error.message);
    } finally {
        db.release();
    }
}

// cron schedules deletion of reset tokens 
cron.schedule('0 * * * *', () => {
    console.log('Resetting tokens...');
    delResetTokens();
});

module.exports = router;
