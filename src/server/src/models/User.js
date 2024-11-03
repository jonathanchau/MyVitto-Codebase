const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.js'); 

const User = sequelize.define('User', {
  // Define the attributes of the User model
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  profile_color: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  underscored: true, // Use snake_case instead of camelCase for automatically added attributes
  tableName: 'users' // Set the table name explicitly
});

module.exports = User;
