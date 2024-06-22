import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";

const productsController = {
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.findAll();
      res.status(200).json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  },

  createProduct: async (req, res) => {
    try {
      const { categoryId, productName, price, description, stock } = req.body;
      const image = req.file;

      if (!categoryId || !productName || !price || !description || !stock || !image) {
        return res.status(400).json({ error: "Missing required fields: categoryId, productName, price, description, stock, or image" });
      }

      const category = await Category.findByPk(categoryId);
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }

      const existingProduct = await Product.findOne({ where: { productName } });
      if (existingProduct) {
        return res.status(400).json({ message: "Product with this name is already added" });
      }

      const newProduct = await Product.create({
        categoryId,
        categoryName: category.categoryName,
        productName,
        price: parseFloat(price),
        description,
        stock: parseInt(stock, 10),
        imagePath: `/uploads/${image.filename}`,
      });

      res.status(201).json({ message: "Product created", product: newProduct });
    } catch (error) {
      console.error('Error in createProduct:', error);
      res.status(500).json({ error: "Failed to create product", details: error });
    }
  },

  getProductById: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);
      if (!product) {
        res.status(404).json({ error: "Product not found" });
      } else {
        res.status(200).json(product);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch product" });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const { productName, price, description, stock, imagePath } = req.body;
      const [updatedRowCount] = await Product.update(
        { productName, price, description, stock, imagePath },
        { where: { id } }
      );
      if (updatedRowCount > 0) {
        const updatedProduct = await Product.findByPk(id);
        res.status(200).json(updatedProduct);
      } else {
        res.status(404).json({ error: "Product not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update product" });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedRowCount = await Product.destroy({ where: { id } });
      if (deletedRowCount > 0) {
        res.status(200).json({ message: "Product deleted successfully" });
      } else {
        res.status(404).json({ error: "Product not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete product" });
    }
  },
};

export default productsController;
