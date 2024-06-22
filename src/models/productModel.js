import { DataTypes } from 'sequelize';
import sequelize from '../db/config.js';

const productModel = sequelize.define('Product', {
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
  categoryName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default productModel;
