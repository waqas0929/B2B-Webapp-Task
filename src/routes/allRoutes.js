import authenticateJWT from "../middleware/authmiddleware.js"

import userRouter from "./userRoutes.js";

const allRoutes = [userRouter, authenticateJWT]

export default allRoutes