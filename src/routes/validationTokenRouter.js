import express from 'express';
import tokenModel from '../models/tokenModel.js';
import errorHandler from '../utils/errorHandler.js';

const validationTokenRouter = express.Router();

validationTokenRouter.post('/validate-token', async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return errorHandler(res, "ACCESS_DENIED");
  }

  try {
    const tokenEntry = await tokenModel.findOne({ where: { token } });

    if (!tokenEntry) {
      return errorHandler(res, "TOKEN_INVALID");
    }

    // Optionally, you can add more validation checks here, such as expiration date

    return res.json({ valid: true });
  } catch (error) {
    console.error("Error validating token:", error);
    return errorHandler(res, "INTERNAL_SERVER_ERROR");
  }
});

export default validationTokenRouter;
