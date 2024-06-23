import express from "express";
import cartRouter from "./cartRoutes.js";
import categoryRouter from "./categoryRoutes.js";
import productRouter from "./productRoutes.js";
import salesRouter from "./saleRoutes.js";
import userRouter from "./userRoutes.js";
import validationTokenRouter from "./validationTokenRoutes.js";
import orderRouter from "./orderRoutes.js";

const allRoutes = express.Router();

allRoutes.use(userRouter);
allRoutes.use(validationTokenRouter);
allRoutes.use(cartRouter);
allRoutes.use(categoryRouter);
allRoutes.use(productRouter);
allRoutes.use(salesRouter);
allRoutes.use(orderRouter);

export default allRoutes;
