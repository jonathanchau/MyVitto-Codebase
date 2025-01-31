const express = require('express');
const router = express.Router();
const pool = require("../config/db.js");

router.get('/sessionData', async (req, res) => {
    const db = await pool.getConnection();
    try {
        const user_id = req.session.user_id;
        const response = await db.execute('SELECT * FROM users WHERE user_id = ?', [user_id]);

        // console.log(response[0][0]);
        res.status(200).json(response[0][0]);
    } catch (error) {
        console.error("Something went wrong when retrieving session data");
        res.status(500).json({ error: 'error' });
    } finally {
        db.release();
    }
});

module.exports = router;