import { DataTypes } from "sequelize";
import sequelize from "../db/config.js";
import userModel from "./userModel.js";

const tokenModel = sequelize.define("token", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  token: {
    type: DataTypes.STRING(500), // This sets the length to 500
    allowNull: false,
  },
  tokenExpiration: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: userModel,
      key: "id",
    },
    onDelete: "CASCADE",
  },
});

userModel.hasMany(tokenModel, { foreignKey: "userId" });
tokenModel.belongsTo(userModel, { foreignKey: "userId" });

export default tokenModel;
