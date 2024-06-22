import express from "express";
import productController from "../controllers/productController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import authorizeRole from "../middleware/authorizeRoleMiddleware.js";

import multer from "multer";

const upload = multer({ dest: 'uploads/' });

const productRouter = express.Router();

productRouter.post("/addProduct", authMiddleware, upload.single('image'), productController.createProduct);
productRouter.put("/product/:id", authMiddleware, authorizeRole("admin"), productController.updateProduct);
productRouter.get("/product/:id", authMiddleware, authorizeRole("admin"), productController.getProductById);
productRouter.get("/products", authMiddleware, productController.getAllProducts);
productRouter.delete("/product/:id", authMiddleware, authorizeRole("admin"), productController.deleteProduct);

export default productRouter;
