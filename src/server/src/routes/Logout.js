const express = require('express');
const router = express.Router();

// used for logout
router.get("/logout", async (req, res) => {
    req.session.destroy();
    res.status(200).json({logout: true});
});

// used for log out (don't know if this is needed though)
router.get("/google-logout", async (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
