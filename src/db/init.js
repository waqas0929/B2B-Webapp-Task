import userModel from "../models/userModel.js";
import tokenModel from "../models/tokenModel.js";
import categoryModel from "../models/categoryModel.js";
import productModel from "../models/productModel.js";
import productCategoryModel from "../models/productCategoryModel.js";
import saleModel from "../models/saleModel.js";
import cartModel from "../models/cartModel.js"

const syncDB = async () => {
  await userModel.sync({ alter: true, force: false });
  await tokenModel.sync({ alter: true, force: false });
  await categoryModel.sync({ alter: true, force: false });
  await productModel.sync({ alter: true, force: false });
  await productCategoryModel.sync({ alter: true, force: false });
  await saleModel.sync({ alter: true, force: false });
  await cartModel.sync({ alter: true, force: false });
};

export default syncDB;
