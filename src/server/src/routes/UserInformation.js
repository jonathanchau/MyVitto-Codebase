const express = require('express')
const router = express.Router()
const pool = require("../config/db.js");
const { checkForDuplicates } = require("../utils/checkDuplicates.js");
const { isValidEmail } = require('../utils/isVaildEmail.js');
const { isValidPassword } = require("../utils/isValidPassword.js");

router.post("/Dashboard/:name/settings", async (req, res) => {
    const db = await pool.getConnection();

    const newEmail = req.body.email;
    const newUserName = req.body.username;
    const newPassword = req.body.password;
    const sessionID = req.session.user_id;

    // check for duplicate email/username
    if (!checkForDuplicates(newUserName)) {
        res.status(200).json({ error: "Duplicate Email or Username, please choose another one"});
        return
    }

    // check for valid password
    if (!isValidPassword(newPassword) && newPassword.length !== 0) {
        res.status(200).json({ error: "Password does not meet minimum requirements. 8-20 characters, 1 special, 1 number required"});
        return
    }

    // check for valid email
    if (!isValidEmail(newEmail) && newEmail.length !== 0) {
        res.status(200).json({ error: "Email does not meet minimum requirements"});
        return
    }

    // Build the query dynamically
    let fields = [];
    let values = [];

    // check if there is a value, then push into query
    if (newEmail) {
        fields.push("email = ?");
        values.push(newEmail);
    }

    if (newUserName) {
        fields.push("username = ?");
        values.push(newUserName);
    }

    if (newPassword) {
        fields.push("password = ?");
        values.push(newPassword);
    }

    if (fields.length === 0) {
        res.status(200).json({ error: "No fields to update" });
        return
    }
    values.push(sessionID); // Add sessionID to the values array

    /* TO DO:
    - Log out the user after account change
    - Add a warning message that the user will be logged out if they do finish the account change
    - Add some CSS for styling
    */
    const query = `UPDATE users SET ${fields.join(", ")} WHERE user_id = ?`;

    // Updates account information
    try {
        const result = await db.execute(query, values);
        console.log("test3");

        if (result[0].affectedRows === 0) {
            res.status(200).json({ error: "User not found"});
        }
        else { // success
            console.log(result)
            res.status(200).json({ updated: "Your information has been updated. You will be logged out shortly" });
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Error in updating account credentials" });
    } finally {
        db.release();
    }

    // db.query(query, values, (err, result) => {
    //     if (err) {
    //         res.status(500).json({ error: "Error in updating account credentials" });
    //         console.log("failure")
    //     } else if (result.affectedRows === 0) {
    //         res.status(404).json({ error: "User not found" });
    //     } else {
    //         res.status(200).json({ updated: "Your information has been updated" });
    //         console.log("success")
    //     }
    // })
});

module.exports = router;