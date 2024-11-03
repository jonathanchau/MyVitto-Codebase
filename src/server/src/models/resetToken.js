const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.js'); 

const resetToken = sequelize.define('resetToken', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        defaultValue: NULL
    },
    token: {
        type: DataTypes.STRING,
        defaultValue: NULL
    },
    expiration: {
        type: DataTypes.DATE,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    used: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
}, {
    underscored: true, // Use snake_case instead of camelCase for automatically added attributes
    tableName: 'resettokens' // Set the table name explicitly
});

module.exports = resetToken;
