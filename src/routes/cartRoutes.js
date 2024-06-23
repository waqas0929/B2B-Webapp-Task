import express from 'express';
import salesController from '../controllers/salesController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import cartController from '../controllers/cartController.js';
import authenticateJWT from '../middleware/authMiddleware.js';

const cartRouter = express.Router();

cartRouter.post('/addToCart', authMiddleware, cartController.addToCart);
cartRouter.get('/cart/:userId', authMiddleware, salesController.getCartItems);
cartRouter.delete("/cart/:userId/:productId", authenticateJWT, cartController.removeFromCart);
cartRouter.put('/cart/:userId/:productId', authenticateJWT, cartController.updateCartItem);


export default cartRouter;
