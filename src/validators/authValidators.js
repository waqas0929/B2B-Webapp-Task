import Joi from "joi";
import errorHandler from "../utils/errorHandler.js";

const AuthValidators = {
  // validation for signup
  signup: (req, res, next) => {
    const schema = Joi.object({
      firstName: Joi.string()
        .required()
        .custom((value, helpers) => {
          if (value.length < 2) {
            return helpers.error("any.invalid");
          }
          return value;
        }),
      lastName: Joi.string()
        .required()
        .custom((value, helpers) => {
          if (value.length < 2) {
            return helpers.error("any.invalid");
          }
          return value;
        }),
      email: Joi.string().email().max(355).trim().lowercase().required(),
      password: Joi.string()
        .min(8)
        .required()
        .pattern(
          new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
          )
        )
        .message({
          "string.pattern.base":
            "Password must have one lowercase one uppercase one number and one special character ",
        }),
      role: Joi.string().valid("user", "admin").default("user"),
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
      console.error("validation error", error.details);
      return errorHandler(res, "INVALID_CREDENTIALS");
    }

    next();
  },
  // validation for signin
  signin: (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string().email().max(355).trim().lowercase().required(),
      password: Joi.string()
        .min(8)
        .required()
        .pattern(
          new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
          )
        )
        .message({
          "string.pattern.base":
            "Password must have one lowercase one uppercase one number and one special character ",
        }),
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
      return errorHandler(res, "INVALID_CREDENTIALS");
    }

    next();
  },
};

export default AuthValidators;
