import errorHandler from "../utils/errorHandler.js";

const authorizeRole = (requiredRole) => {
  return (req, res, next) => {
    const { role } = req.user; // Ensure role is taken from req.user

    if (!role) {
      return errorHandler(res, "FORBIDDEN_NO_ROLE_ASSIGN");
    }

    if (role !== requiredRole) {
      return errorHandler(res, "ACCESS_DENIED");
    }
    next();
  };
};

export default authorizeRole;
