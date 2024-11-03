const { Sequelize } = require('sequelize');

// Initialize Sequelize with database credentials
const sequelize = new Sequelize({
  dialect: 'mysql', // The database dialect
  host: 'localhost', // The host of the database
  port: 3306, // The port of the database
  username: 'root', // Your database username
  password: 'Mycc2@15', // Your database password
  database: 'vittodb', // Your database name
  logging: false, // Disable logging SQL queries (optional)
});

// Test the database connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// Call the function to test the database connection
testConnection();

// Export the configured Sequelize instance
module.exports = sequelize;
