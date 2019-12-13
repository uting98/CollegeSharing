'use strict';
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {}

  Chat.init(
    {
      chatID: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        field: 'chatID',
        allowNull: false,
        autoIncrement: true,
      },
      user1: {
        type: DataTypes.INTEGER,
        field: 'user1',
        allowNull: false,
      },
      user2: {
        type: DataTypes.INTEGER,
        field: 'user2',
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "chat"
    }
  );

  Chat.associate = (models) => {
    Chat.belongsTo(models.User, {
      foreignKey: 'user1',
      foreignKeyConstraint: true,
    });
    Chat.belongsTo(models.User, {
        foreignKey: 'user2',
        foreignKeyConstraint: true,
      });
    // Product.belongsTo(models.Category, {
    //   foreignKey: 'categoryID',
    //   foreignKeyConstraint: true,
    // });
    // Chat.hasMany(models.Transaction, {
    //   foreignKey: 'productID',
    //   foreignKeyConstraint: true,
    // });
  };

  return Chat;
};