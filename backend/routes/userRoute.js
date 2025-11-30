import { Router } from "express";
import { protect } from "../middleware/protect.js";
import {
  deleteUser,
  getProfile,
  loginUser,
  registerUser,
  updateProfile,
} from "../controller/userController.js";
import { validateRequest } from "../middleware/validateRequest.js";
import {
  loginSchema,
  registerSchema,
  updateProfileSchema,
} from "../validation/userValidation.js";

const userRouter = Router();

userRouter.post("/register", validateRequest(registerSchema), registerUser);
userRouter.post("/login", validateRequest(loginSchema), loginUser);
userRouter.delete("/delete", protect, deleteUser);
userRouter
  .route("/me")
  .get(protect, getProfile)
  .put(protect, validateRequest(updateProfileSchema), updateProfile);

export { userRouter };
