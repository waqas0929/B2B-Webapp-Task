// src/utils/errorCodes.js
const errorCodes = {
  // User related errors
  NOT_FOUND: { status: 404, message: "Not found" },
  EMAIL_AND_PASSWORD_REQUIRED: {
    status: 404,
    message: "Email and password are required",
  },
  INVALID_CREDENTIALS: { status: 401, message: "Invalid credentials" },
  INVALID_USER_ID: { status: 401, message: "Invalid user id" },
  EMAIL_NOT_VERIFIED: { status: 403, message: "Email not verified" },
  ONLY_ADMIN_CAN_DELETE_THE_SALE: { status: 403, message: "ONLY ADMIN CAN DELETE THE SALE" },
  ACCOUNT_LOCKED: {
    status: 403,
    message: "Account locked, try after 5 minutes",
  },
  ACCOUNT_PERMANENTLY_LOCKED: {
    status: 403,
    message: "Account permanently locked",
  },
  PASSWORD_RESET_FAILED: { status: 400, message: "Password reset failed" },
  EMAIL_ALREADY_EXIST: { status: 409, message: "Email already exists" },
  USER_REGISTER_SUCCESSFULLY: {
    status: 201,
    message: "User registered successfully",
  },
  UPDATE_USER_SUCCESSFULLY: {
    status: 200,
    message: "User updated successfully",
  },
  SALES_CREATED_SUCCESSFULLY: {
    status: 200,
    message: "sale created successfully",
  },
  ALL_PRODUCTS: {
    status: 200,
    message: "all products",
  },
  PRODUCT_NOT_FOUND: { status: 404, message: 'Product not found' },
    PRODUCT_ID_REQUIRED: { status: 400, message: 'Product ID is required' },
  PRODUCT_ASSIGNED_TO_CATEGORY_SUCCESSFULLY: {
    status: 200,
    message: "product assign to category successfully",
  },
  USER_DELETED_SUCCESSFULLY: {
    status: 200,
    message: "User deleted successfully",
  },
  CATEGORY_ADDED_SUCCESSFULLY: {
    status: 200,
    message: "Category added successfully",
  },
  PRODUCT_ADDED_SUCCESSFULLY: {
    status: 201,
    message: "Product added successfully",
  },
  PRODUCT_ALREADY_EXISTS: { status: 409, message: "Product already exists" },
  PRODUCT_ALREADY_ASSIGNED_TO_CATEGORY: { status: 409, message: "PRODUCT ALREADY ASSIGNED TO CATEGORY" }, 
  PRODUCT_UPDATE_SUCCESSFULLY: {
    status: 200,
    message: "Product updated successfully",
  },
  PRODUCT_DELETED_SUCCESSFULLY: {
    status: 200,
    message: "Product deleted successfully",
  },
  PRODUCT_ASSIGN_TO_CATEGORY_SUCCESSFULLY: {
    status: 200,
    message: "Product assigned to category successfully",
  },
  EMAIL_VERIFICATION_FAILED: {
    status: 500,
    message: "Email verification failed",
  },
  USER_NOT_FOUND: { status: 404, message: "User not found" },
  PRODUCT_ID_REQUIRED: { status: 404, message: "product id is required" },

  // Token related errors
  TOKEN_EXPIRED: { status: 401, message: "Token expired" },
  TOKEN_INVALID: { status: 401, message: "Invalid token" },
  ACCESS_DENIED: { status: 403, message: "Access denied" },

  // Database related errors
  DB_CONNECTION_FAILED: { status: 500, message: "Database connection failed" },
  DB_QUERY_FAILED: { status: 500, message: "Database query failed" },

  // Validation errors
  VALIDATION_ERROR: { status: 400, message: "Validation error" },
  SALES_DETAILS_REQUIRED: { status: 400, message: "Sales details required" },

  // General errors
  INTERNAL_SERVER_ERROR: { status: 500, message: "Internal server error" },
  FORBIDDEN: { status: 403, message: "Forbidden" },
  FORBIDDEN_NO_ROLE_ASSIGN: {
    status: 403,
    message: "Forbidden: No role assigned",
  },

  // Query parameter error
  QUERY_PARAMETER_IS_REQUIRED: {
    status: 400,
    message: "Query parameter is required",
  },

  // Custom error codes
  DATABASE_ERROR: { status: 500, message: "Database error" },
  EMAIL_SENDING_ERROR: { status: 500, message: "Error sending email" },
};

export default errorCodes;
