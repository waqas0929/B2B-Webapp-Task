import { DataTypes } from 'sequelize';
import sequelize from '../db/config.js';
import salesModel from './saleModel.js';

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  categoryId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  imagePath: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Assuming categoryName is optional or not required
  categoryName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});


export default Product;
