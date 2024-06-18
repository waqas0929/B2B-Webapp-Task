import userModel from "../models/userModel.js";
import tokenModel from "../models/tokenModel.js";

const syncDB = async () => {
  await userModel.sync({ alter: true, force: false });
  await tokenModel.sync({ alter: true, force: false });
};

export default syncDB;
