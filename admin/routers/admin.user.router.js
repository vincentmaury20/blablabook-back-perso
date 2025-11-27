import { Router } from "express";
import { adminUserController } from "../controllers/admin.user.controller.js";
import { authenticate } from "../../middlewares/authentification.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";


export const adminUserRouter = Router();

adminUserRouter.post("/admin/user", authenticate, isAdmin, adminUserController.createUser);
adminUserRouter.get("/admin/users", authenticate, isAdmin, adminUserController.getUsers);
adminUserRouter.get("/admin/user/:id", authenticate, isAdmin, adminUserController.getUserById);
adminUserRouter.put("/admin/user/:id", authenticate, isAdmin, adminUserController.updateUser);
adminUserRouter.delete("/admin/user/:id", authenticate, isAdmin, adminUserController.deleteUser);
