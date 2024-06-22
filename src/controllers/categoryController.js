
import Category from "../models/categoryModel.js";



const categoryController = {
  getAllCategory: async (req, res) => {
    try {
      const categories = await Category.findAll(); // Fetch all categories without including User model
      res.status(200).json(categories);
    } catch (error) {
      console.error('Error in getAllCategory:', error);
      res.status(500).json({ error: 'Failed to get all categories', details: error });
    }
  },

  // Create a new category
  createCategory: async (req, res) => {
    try {
      const { categoryName } = req.body;
      console.log('Received categoryName:', categoryName); 
  
      if (!categoryName) {
        return res.status(400).json({ error: 'Missing required field: categoryName' });
      }
  
      const newCategory = await Category.create({
        categoryName,
      });
  
      res.status(201).json({ message: 'Category created', category: newCategory });
    } catch (error) {
      console.error('Error in createCategory:', error);
      res.status(500).json({ error: 'Failed to create category', details: error });
    }
  },

  // Get a category by ID
  getCategoryById: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.findByPk(id);
      if (!category) {
        res.status(404).json({ error: "Category not found" });
      } else {
        res.status(200).json(category);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch category" });
    }
  },

  // Update a category
  updateCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const [updatedRowCount] = await Category.update({ name }, { where: { id } });
      if (updatedRowCount > 0) {
        const updatedCategory = await Category.findByPk(id);
        res.status(200).json(updatedCategory);
      } else {
        res.status(404).json({ error: "Category not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update category" });
    }
  },

  // Delete a category
  deleteCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedRowCount = await Category.destroy({ where: { id } });
      if (deletedRowCount > 0) {
        res.status(200).json({ message: "Category deleted successfully" });
      } else {
        res.status(404).json({ error: "Category not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete category" });
    }
  },
};

export default categoryController;
