import userModel from "../models/userModel.js";
import { compare, hash } from "bcrypt";
import errorHandler from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";
import tokenModel from "../models/tokenModel.js";
import bcrypt from "bcrypt";

const userController = {
  signup: async (req, res) => {
    try {
      const { firstName, lastName, email, password, role, phoneNumber, address, postalCode } = req.body;
      if (!firstName || !lastName || !email || !password) {
        return errorHandler(res, "USER_DETAILS_REQUIRED");
      }

      const existingUser = await userModel.findOne({ where: { email } });
      if (existingUser) {
        return errorHandler(res, "EMAIL_ALREADY_EXIST");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await userModel.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role: role || "user",
        phoneNumber,
        address,
        postalCode,
      });

      errorHandler(res, "USER_REGISTER_SUCCESSFULLY", newUser);
    } catch (error) {
      console.error("Signup Error:", error);
      errorHandler(res, "INTERNAL_SERVER_ERROR");
    }
  },

  signin: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return errorHandler(res, "EMAIL_AND_PASSWORD_REQUIRED");
      }

      const user = await userModel.findOne({ where: { email } });
      if (!user) {
        return errorHandler(res, "INVALID_CREDENTIALS");
      }

      const isPasswordValid = await compare(password, user.password);
      if (!isPasswordValid) {
        return errorHandler(res, "INVALID_CREDENTIALS");
      }

      const data = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        role: user.role,
      };

      const tokenExpiration = new Date(Date.now() + 60 * 60 * 1000);
      const token = jwt.sign(data, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h",
      });

      await tokenModel.create({
        token,
        tokenExpiration,
        userId: user.id,
      });

      res.json({ data, token });
    } catch (error) {
      console.error("Signin Error", error);
      errorHandler(res, "INTERNAL_SERVER_ERROR");
    }
  },
  getUserProfile: async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await userModel.findByPk(userId);

      if (!user) {
        return errorHandler(res, "USER_NOT_FOUND");
      }

      res.json(user);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      errorHandler(res, "INTERNAL_SERVER_ERROR");
    }
  },

  updateUser: async (req, res) => {
    try {
      const { userId } = req.params;

      if (!userId) {
        return errorHandler(res, "INVALID_USER_ID");
      }
      const user = await userModel.findByPk(userId);
      if (!user) {
        return errorHandler(res, "USER_NOT_FOUND");
      }

      const { firstName, lastName, email, role, phoneNumber, address, postalCode } = req.body;

      if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName;
      if (email) user.email = email;
      if (role) user.role = role;
      if (phoneNumber) user.phoneNumber = phoneNumber;
      if (address) user.address = address;
      if (postalCode) user.postalCode = postalCode;

      await user.save();

      return errorHandler(res, "UPDATE_USER_SUCCESSFULLY", user);
    } catch (error) {
      console.error("Update profile error", error);
      return errorHandler(res, "INTERNAL_SERVER_ERROR");
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { userId } = req.params;

      if (!userId) {
        return errorHandler(res, "INVALID_USER_ID");
      }

      const user = await userModel.findByPk(userId);
      if (!user) {
        return errorHandler(res, "USER_NOT_FOUND");
      }

      await tokenModel.destroy({ where: { userId } });
      await user.destroy();

      return errorHandler(res, "USER_DELETED_SUCCESSFULLY");
    } catch (error) {
      console.error(error);
      return errorHandler(res, "INTERNAL_SERVER_ERROR");
    }
  },
};

export default userController;
