import jwt from "jsonwebtoken";
import tokenModel from "../models/tokenModel.js";
import userModel from "../models/userModel.js";
import errorHandler from "../utils/errorHandler.js";

const authenticateJWT = async (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return errorHandler(res, "ACCESS_DENIED");
  }

  try {
    const tokenEntry = await tokenModel.findOne({ where: { token } });

    if (!tokenEntry) {
      return errorHandler(res, "TOKEN_INVALID");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await userModel.findByPk(decoded.id);
    if (!user) {
      return errorHandler(res, "INVALID_TOKEN");
    }

    req.user = user; // Ensure user is attached to req object
    next();
  } catch (error) {
    console.error(error);
    return errorHandler(res, "INTERNAL_SERVER_ERROR");
  }
};

export default authenticateJWT;
