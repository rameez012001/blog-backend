const {DataTypes} = require('sequelize');
const sequelize = require('../database');

const Post = sequelize.define('Post',{
    title:{
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
})

module.exports = Post;