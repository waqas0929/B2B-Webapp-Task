import { DataTypes } from 'sequelize';
import sequelize from '../db/config.js';

const categoryModel = sequelize.define('Category', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  categoryName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default categoryModel;
