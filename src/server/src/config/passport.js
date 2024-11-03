const passport = require('passport'); /* npm install passport */
const GoogleStrategy = require('passport-google-oauth20').Strategy; /* passport-google-oauth20 */
const db = require('../config/db.js')
const crypto = require('crypto')

/* NOTE: CHANGED THE config file for the database, do this next */

passport.use(new GoogleStrategy({
  clientID: '177875372001-29cpo0hudr5mu5dv2bi7lteaeln9rss9.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: 'http://localhost:3001/authenticateWithGoogle',
},
  async (accessToken, refreshToken, profile, done) => {
    const id = profile.id;
    const username = profile.displayName;
    const dummyPassword = crypto.randomBytes(16).toString('hex'); // dummy password to store in database
    const email = profile.emails[0].value;
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);

    // check if user is exists in the database
    db.query("SELECT * FROM users WHERE user_id = ? OR email = ?",
      [id, email],
      (err, result) => {
        if (err) {
          // res.status(404).json(err);
          console.log(err);
        }
        if (result[0].user_id !== undefined && result[0].user_id === id) {
          // res.status(200).json(result);
          console.log(result);
        }
        else if (result[0].email !== undefined && result[0].user_id === email) {
          console.log("Already signed up with an email for this website");
          console.log(result);
        }
        else {
          saveUserInfo(id, username, dummyPassword, email, randomColor); // calls function below
        }
      }
    );

    return done(null, profile);
  }));

// save user information to the database
const saveUserInfo = (id, username, dummyPassword, email, randomColor) => {
  db.query(
    "INSERT INTO users (user_id, username, password, email, profile_color) VALUES (?,?,?,?,?);",
    [id, username, dummyPassword, email, randomColor],
    (err, result) => {
      if (err) {
        // res.status(404).json(err);
        console.log(err);
      }
      console.log(result);
      // res.status(200).json({ result: result, username: username });
    }
  );
}

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

module.exports = passport;
