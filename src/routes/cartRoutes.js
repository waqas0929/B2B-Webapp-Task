import express from 'express';
import authenticateJWT from '../middleware/authMiddleware.js';
import cartController from '../controllers/cartController.js';

const cartRouter = express.Router();

cartRouter.post('/addToCart', authenticateJWT, cartController.addToCart);
cartRouter.get('/cart/:userId', authenticateJWT, cartController.getCartItems);
cartRouter.delete("/cart/:userId/:productId", authenticateJWT, cartController.removeFromCart);
cartRouter.put('/cart/:userId/:productId', authenticateJWT, cartController.updateCartItem);

export default cartRouter;
