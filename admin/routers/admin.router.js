import { Router } from "express";
import { adminController } from "../controllers/index.js";
import { authenticateAdmin } from "../middlewares/authenticateAdmin.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";

export const adminRouter = Router();

// Dashboard
adminRouter.get(
  "/admin",
  authenticateAdmin,
  isAdmin,
  adminController.getDashboard,
);

// Login form
adminRouter.get("/admin/login", adminController.getLogin);

// Handle login
adminRouter.post("/admin/login", adminController.postLogin);

// Logout
adminRouter.get("/admin/logout", adminController.logout);
