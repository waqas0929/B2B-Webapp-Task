import express from "express";
import userController from "../controllers/user.js";
import AuthValidators from "../validators/authValidators.js";
import authenticateJWT from "../middleware/authmiddleware.js";
import authorizeRole from "../middleware/authorizeRoleMiddleware.js";
import getUserData from "../services/userServices.js";

const userRouter = express.Router();

userRouter.post("/signup", AuthValidators.signup, userController.signup);
userRouter.post("/signin", AuthValidators.signin, userController.signin);
userRouter.put(
  "/user/update/:userId",
  authenticateJWT,
  userController.updateUser
);
userRouter.delete(
  "/user/delete/:userId",
  authenticateJWT,
  authorizeRole("admin"),
  userController.deleteUser
);

userRouter.get("/user/:id", authenticateJWT, async (req, res) => {
  const userData = await getUserData(req.params.id);
  res.json(userData);
});

export default userRouter;
