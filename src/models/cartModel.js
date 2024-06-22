import { DataTypes } from 'sequelize';
import sequelize from '../db/config.js';
import Product from './productModel.js';
import User from './userModel.js';

const cartModel = sequelize.define('Cart', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  productId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Product,
      key: 'id',
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
  tableName: 'carts',
});

cartModel.belongsTo(User, { foreignKey: 'userId' });
cartModel.belongsTo(Product, { foreignKey: 'productId' });

export default cartModel;
