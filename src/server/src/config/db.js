const mysql = require('mysql2/promise');

// Creates a connection to the database
// const db = mysql.createConnection({
//     connectionLimit : 30,
//     user: "root",
//     host: "localhost",
//     password: "L2$01NDBLIa9", 
//     database: "vittodb"
// });

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'L2$01NDBLIa9', /* password will remain blank (from root password in mysql) */
    database: 'vittodb',
    waitForConnections: true,
    connectionLimit: 30,  // Limit the number of connections in the pool
    queueLimit: 0         // 0 means no limit
});

module.exports = pool;
