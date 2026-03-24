import { Router } from "express";
import { userAuthentificationController } from "../controllers/index.js";
import { authenticate } from "../middlewares/authentification.middleware.js";
import avatarUpload from "../middlewares/uploadAvatar.middleware.js";

export const userRouter = Router();

userRouter.post(
  "/user/register",
  avatarUpload.single("avatar"),
  userAuthentificationController.register,
);

userRouter.post("/user/login", userAuthentificationController.login);

userRouter.get("/auth/me", authenticate, userAuthentificationController.getMe);

userRouter.post(
  "/user/avatar",
  authenticate,
  avatarUpload.single("avatar"),
  userAuthentificationController.updateUserAvatar,
);
