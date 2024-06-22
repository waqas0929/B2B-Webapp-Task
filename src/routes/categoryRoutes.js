import express from 'express';
import categoryController from '../controllers/categoryController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import authorizeRole from '../middleware/authorizeRoleMiddleware.js';

const categoryRouter = express.Router();

categoryRouter.post('/category', authMiddleware, authorizeRole('admin'), categoryController.createCategory);
categoryRouter.get('/categories', authMiddleware, categoryController.getAllCategory);
categoryRouter.get('/category/:categoryId', authMiddleware, authorizeRole('admin'), categoryController.getCategoryById);
categoryRouter.put('/category/:categoryId', authMiddleware, authorizeRole('admin'), categoryController.updateCategory);
categoryRouter.delete('/category/:categoryId', authMiddleware, authorizeRole('admin'), categoryController.deleteCategory);

export default categoryRouter;
