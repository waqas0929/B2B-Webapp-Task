import express from "express";
import userController from "../controllers/user.js";
import AuthValidators from "../validators/authValidators.js";
import authenticateJWT from "../middleware/authMiddleware.js";
import authorizeRole from "../middleware/authorizeRoleMiddleware.js";
import getUserData from "../services/userServices.js";

const userRouter = express.Router();

userRouter.post("/signup", AuthValidators.signup, userController.signup);
userRouter.post("/signin", AuthValidators.signin, userController.signin);
userRouter.get("/user/:userId", authenticateJWT, userController.getUserProfile);
userRouter.delete("/user/delete/:userId", authenticateJWT, authorizeRole("admin"), userController.deleteUser);

// userRouter.get("/auth/me", authenticateJWT, async (req, res) => {
//   try {
//     console.log("User from token:", req.user);
//     if (!req.user || !req.user.id) {
//       return res.status(400).json({ message: "User ID is missing from token" });
//     }

//     const userData = await getUserData(req.user.id);
//     res.json(userData);
//   } catch (error) {
//     console.error("Error fetching user details:", error.message, error.stack);
//     res.status(500).json({ message: "Error fetching user details", error });
//   }
// });

export default userRouter;
