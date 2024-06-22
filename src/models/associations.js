import categoryModel from './categoryModel.js';
import userModel from './userModel.js';
import productModel from './productModel.js';
import salesModel from './saleModel.js';
import cartModel from './cartModel.js';
import sequelize from '../db/config.js';

// Define associations
productModel.belongsToMany(categoryModel, { through: 'ProductCategory' });
categoryModel.belongsToMany(productModel, { through: 'ProductCategory' });

userModel.hasMany(salesModel, { foreignKey: 'userId' });
salesModel.belongsTo(userModel, { foreignKey: 'userId' });

productModel.hasMany(salesModel, { foreignKey: 'productId' });
salesModel.belongsTo(productModel, { foreignKey: 'productId' });

userModel.hasMany(cartModel, { foreignKey: 'userId' });
cartModel.belongsTo(userModel, { foreignKey: 'userId' });

productModel.hasMany(cartModel, { foreignKey: 'productId' });
cartModel.belongsTo(productModel, { foreignKey: 'productId' });

// Sync associations with the database
sequelize.sync();

export default sequelize;
