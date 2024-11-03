const pool = require("../config/db.js")

// checks for duplicate username or email in the database (yes = false, no = true)
const checkForDuplicates = async (usernameOrEmail) => {
    const db = await pool.getConnection();

    try {
        const result = await db.execute("SELECT * FROM users WHERE username = ? OR email = ?", [usernameOrEmail, usernameOrEmail])

        db.release();
        if (result[0].length > 0) {
            return false; // there is a duplicate
        }
    } catch (err) {
        console.log("Error in checkForDuplicates utils")
    }

    return true; // there is no duplicate
}

module.exports = { checkForDuplicates }