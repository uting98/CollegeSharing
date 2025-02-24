'use strict';
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Product extends Model {}

  Product.init(
    {
      productID: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        field: 'productID',
        allowNull: false,
        autoIncrement: true,
      },
      sellerID: {
        type: DataTypes.INTEGER,
        field: 'sellerID',
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        field: 'category',
      },
      productName: {
        type: DataTypes.STRING,
        filed: 'productName',
      },
      price: {
        type: DataTypes.INTEGER,
        field: 'price',
      },
      amount: {
        type: DataTypes.INTEGER,
        field: 'amount',
      },
      description: {
        type: DataTypes.TEXT,
        field: 'description',
      },
      imageURL: {
        type: DataTypes.TEXT,
        field: 'imageURL',
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "product"
    }
  );

  Product.associate = (models) => {
    Product.belongsTo(models.User, {
      foreignKey: 'sellerID',
      foreignKeyConstraint: true,
    });
    // Product.belongsTo(models.Category, {
    //   foreignKey: 'categoryID',
    //   foreignKeyConstraint: true,
    // });
    Product.hasMany(models.Transaction, {
      foreignKey: 'productID',
      foreignKeyConstraint: true,
    });
  };

  return Product;
};