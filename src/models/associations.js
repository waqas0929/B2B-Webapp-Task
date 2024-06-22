// src/associations.js
import Product from './productModel.js';
import Category from './categoryModel.js';
import User from './userModel.js';
import Sale from './saleModel.js';
import Cart from './cartModel.js';
import sequelize from '../db/config.js';

// Define associations
Product.belongsToMany(Category, { through: 'ProductCategory' });
Category.belongsToMany(Product, { through: 'ProductCategory' });

User.hasMany(Sale, { foreignKey: 'userId' });
Sale.belongsTo(User, { foreignKey: 'userId' });

Product.hasMany(Sale, { foreignKey: 'productId' });
Sale.belongsTo(Product, { foreignKey: 'productId' });

User.hasMany(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { foreignKey: 'userId' });

Product.hasMany(Cart, { foreignKey: 'productId' });
Cart.belongsTo(Product, { foreignKey: 'productId' });

// Sync associations with the database
sequelize.sync();

export default sequelize;
