import express from "express";
import authenticateJWT from "../middleware/authMiddleware.js";
import salesController from "../controllers/salesController.js";
import authorizeRole from "../middleware/authorizeRoleMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js"

const salesRouter = express.Router();

salesRouter.post("/buyNow", authenticateJWT, salesController.buyNow);
salesRouter.get("/getSalesById/:id",authenticateJWT,salesController.getSalesById);
salesRouter.get("/getAllSales", authenticateJWT, salesController.getAllSales);
salesRouter.put(
  "/updateSalesById/:id",
  authenticateJWT,authorizeRole("admin"),
  salesController.updateSalesById
);
salesRouter.delete("/sales/delete/:id",authenticateJWT,authorizeRole("admin"),salesController.deleteSalesById);
salesRouter.post('/buyNow', authMiddleware, salesController.buyNow);

export default salesRouter;