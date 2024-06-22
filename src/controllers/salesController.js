import productModel from "../models/productModel.js";
import salesModel from "../models/saleModel.js";
import errorHandler from "../utils/errorHandler.js";
import cartModel from "../models/cartModel.js";

const salesController = {
  buyNow: async (req, res) => {
    try {
      const { productId, quantity } = req.body;
      const userId = req.user.id; // Ensure user ID is retrieved from req.user

      if (!userId || !productId || !quantity) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const product = await productModel.findByPk(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      if (product.stock < quantity) {
        return res.status(400).json({ message: 'Insufficient stock' });
      }

      const totalPrice = product.price * quantity;
      const updatedStock = product.stock - quantity;
      await product.update({ stock: updatedStock });

      const sale = await salesModel.create({
        userId,
        productId,
        quantity,
        totalAmount: totalPrice,
      });

      res.status(201).json({ message: 'Product purchased successfully', sale });
    } catch (error) {
      console.error('Error processing sale:', error);
      res.status(500).json({ error: 'Failed to process sale', details: error });
    }
  },

  getSalesById: async (req, res) => {
    try {
      const { id } = req.params;
      const sale = await salesModel.findByPk(id);
      if (!sale) {
        return errorHandler(res, "NOT_FOUND");
      }
      res.json({ sale });
    } catch (error) {
      console.error(error);
      errorHandler(res, "INTERNAL_SERVER_ERROR");
    }
  },

  getAllSales: async (req, res) => {
    try {
      const allSales = await salesModel.findAll();
      res.json({ sales: allSales });
    } catch (error) {
      console.error(error);
      errorHandler(res, "INTERNAL_SERVER_ERROR");
    }
  },

  updateSalesById: async (req, res) => {
    try {
      const { role } = req.user;
      if (role !== "admin") {
        return errorHandler(res, "ONLY_ADMIN_CAN_UPDATE_THE_SALE");
      }
      const { id } = req.params;
      const { productId, quantity, totalAmount } = req.body;

      const sale = await salesModel.findByPk(id);
      if (!sale) {
        return errorHandler(res, "NOT_FOUND");
      }

      if (productId) sale.productId = productId;
      if (quantity) sale.quantity = quantity;
      if (totalAmount) sale.totalAmount = totalAmount;

      await sale.save();
      return errorHandler(res, "SALES_UPDATE_SUCCESSFULLY", sale);
    } catch (error) {
      console.error(error);
      errorHandler(res, "INTERNAL_SERVER_ERROR");
    }
  },

  deleteSalesById: async (req, res) => {
    try {
      const { role } = req.user;
      if (role !== "admin") {
        return errorHandler(res, "ONLY_ADMIN_CAN_DELETE_THE_SALE");
      }
      const { id } = req.params;

      const sale = await salesModel.findByPk(id);
      if (!sale) {
        return errorHandler(res, "NOT_FOUND");
      }

      const product = await productModel.findByPk(sale.productId);
      if (product) {
        const revertedStock = Number(product.stock) + Number(sale.quantity);
        await product.update({ stock: revertedStock });
      }

      await sale.destroy();

      res.json({ message: "Sale deleted and stock updated" });
    } catch (error) {
      console.error(error);
      errorHandler(res, "INTERNAL_SERVER_ERROR");
    }
  },

  buyNow: async (req, res) => {
    try {
      const { userId, productId, quantity } = req.body;

      const product = await productModel.findByPk(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      if (product.stock < quantity) {
        return res.status(400).json({ message: 'Insufficient stock' });
      }

      const totalPrice = product.price * quantity;
      const updatedStock = product.stock - quantity;
      await product.update({ stock: updatedStock });

      const sale = await salesModel.create({
        userId,
        productId,
        quantity,
        totalAmount: totalPrice,
      });

      res.status(201).json({ message: 'Product purchased successfully', sale });
    } catch (error) {
      console.error('Error processing sale:', error);
      res.status(500).json({ error: 'Failed to process sale', details: error });
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
  getUserOrders: async (req, res) => {
    try {
      const { userId } = req.params;

      const user = await userModel.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const orders = await saleModel.findAll({
        where: { userId },
        include: [
          {
            model: productModel,
            attributes: ['productName', 'price', 'imagePath'],
          },
        ],
      });

      res.json(orders);
    } catch (error) {
      console.error('Error fetching user orders:', error);
      res.status(500).json({ error: 'Failed to fetch user orders' });
    }
  },
};

export default salesController;
