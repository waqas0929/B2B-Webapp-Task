import express from 'express';
import salesController from '../controllers/salesController.js';
import cartController from '../controllers/cartController.js';
import authenticateJWT from '../middleware/authMiddleware.js';

const cartRouter = express.Router();

cartRouter.post('/addToCart', authenticateJWT, cartController.addToCart);
cartRouter.get('/cart/:userId', authenticateJWT, salesController.getCartItems);
cartRouter.delete("/cart/:userId/:productId", authenticateJWT, cartController.removeFromCart);
cartRouter.put('/cart/:userId/:productId', authenticateJWT, cartController.updateCartItem);


export default cartRouter;
