// src/controllers/cartController.js

import cartModel from "../models/cartModel.js";
import productModel from "../models/productModel.js";
// import errorHandler from '../utils/errorHandler.js';

const cartController = {
  addToCart: async (req, res) => {
    try {
      const { productId, quantity } = req.body;
      const userId = req.user.id; // Get user ID from authenticated user

      if (!userId || !productId || !quantity) {
        return res
          .status(400)
          .json({
            error: "Missing required fields: userId, productId, or quantity",
          });
      }

      const product = await productModel.findByPk(productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      const existingCartItem = await cartModel.findOne({
        where: { userId, productId },
      });

      if (existingCartItem) {
        existingCartItem.quantity += quantity;
        await existingCartItem.save();
        return res.status(200).json({ message: "Product quantity updated in cart", cartItem: existingCartItem });
      } else {
        const cartItem = await cartModel.create({
          userId,
          productId,
          quantity,
        });
        res.status(201).json({ message: "Product added to cart", cartItem });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      res.status(500).json({ error: "Failed to add to cart", details: error });
    }
  },
  getCartItems: async (req, res) => {
    try {
      const { userId } = req.params;

      const cartItems = await cartModel.findAll({ where: { userId }, include: [productModel] });

      res.status(200).json(cartItems);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      res.status(500).json({ error: 'Failed to fetch cart items', details: error });
    }
  },

  removeFromCart: async (req, res) => {
    try {
      const { userId, productId } = req.params;

      const cartItem = await cartModel.findOne({
        where: { userId, productId },
      });
      if (!cartItem) {
        return errorHandler(res, "CART_ITEM_NOT_FOUND");
      }

      await cartItem.destroy();
      res.status(200).json({ message: "Item removed from cart" });
    } catch (error) {
      console.error("Error removing item from cart:", error);
      errorHandler(res, "INTERNAL_SERVER_ERROR");
    }
  },

  updateCartItem: async (req, res) => {
    try {
      const { userId, productId } = req.params;
      const { quantity } = req.body;

      const cartItem = await cartModel.findOne({
        where: { userId, productId },
      });
      if (!cartItem) {
        return res.status(404).json({ error: "Cart item not found" });
      }

      cartItem.quantity = quantity;
      await cartItem.save();

      res.status(200).json({ message: "Cart item updated successfully", cartItem });
    } catch (error) {
      console.error("Error updating cart item:", error);
      res.status(500).json({ error: "Failed to update cart item", details: error });
    }
  },
};

export default cartController;
