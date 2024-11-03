const express = require('express');
const router = express.Router();
const pool = require("../config/db.js");

// This is for the color that is generated of the profile circle icon for each user. 
router.get("/Dashboard/:user", async (req, res) => {
    const db = await pool.getConnection();

    const username = req.params.user;
    
    try{
        const result = await db.execute("SELECT profile_color FROM users WHERE username = ?", [username])

        if (result.length > 0) {
            const retrievedProfileColor = result[0][0].profile_color;
            res.status(200).json({ profile_color: retrievedProfileColor }); // Send the retrieved color
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (err) {
        res.status(500).json({ error: "Error retrieving profile color" });
    } finally {
        db.release();
    }

    // db.query(
    //     "SELECT profile_color FROM users WHERE username = ?",
    //     [username],
    //     (err, result) => {
    //         if (err) {
    //             res.status(500).json({ error: "Error retrieving profile color" });
    //         }
    //         if (result.length > 0) {
    //             const retrievedProfileColor = result[0].profile_color;
    //             res.status(200).json({ profile_color: retrievedProfileColor }); // Send the retrieved color
    //         } else {
    //             res.status(404).json({ error: "User not found" });
    //         }
    //     }
    // );
});

module.exports = router;
