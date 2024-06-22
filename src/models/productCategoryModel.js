
import { DataTypes } from "sequelize";
import sequelize from "../db/config.js";
import productModel from "./productModel.js";
import categoryModel from "./categoryModel.js";

const productCategoryModel = sequelize.define("ProductCategory", {
  id:{
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  productId: {
    type: DataTypes.UUID,
    allowNull:false,
    references: {
      model: productModel,
      key: 'id',
    }
  },
  categoryId: {
    type: DataTypes.UUID,
    allowNull:false,
    references: {
      model: categoryModel,
      key: 'id',
    }
  },
  
},
 {
  timestamps: false
}
);

productModel.belongsToMany(categoryModel, { through: productCategoryModel });
categoryModel.belongsToMany(productModel, { through: productCategoryModel });



export default productCategoryModel;
