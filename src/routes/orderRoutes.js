import express from 'express';
import  salesController  from '../controllers/salesController.js';
import  authenticateJWT  from '../middleware/authMiddleware.js';

const orderRouter = express.Router();

orderRouter.get('/orders/:userId', authenticateJWT, salesController.getUserOrders);

export default orderRouter;
