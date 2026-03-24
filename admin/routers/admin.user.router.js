import { Router } from "express";
import { adminUserController } from "../controllers/admin.user.controller.js";
import { authenticateAdmin } from "../middlewares/authenticateAdmin.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";

export const adminUserRouter = Router();

// List all users
adminUserRouter.get(
  "/admin/users",
  authenticateAdmin,
  isAdmin,
  adminUserController.getUsers,
);

// Render user creation form
adminUserRouter.get(
  "/admin/user/create",
  authenticateAdmin,
  isAdmin,
  adminUserController.createUserForm,
);

// Create a new user
adminUserRouter.post(
  "/admin/user",
  authenticateAdmin,
  isAdmin,
  adminUserController.createUser,
);

// Display user details
adminUserRouter.get(
  "/admin/user/:id",
  authenticateAdmin,
  isAdmin,
  adminUserController.getUserById,
);

// Render edit form
adminUserRouter.get(
  "/admin/user/:id/edit",
  authenticateAdmin,
  isAdmin,
  adminUserController.getUserEditForm,
);

// Update user information
adminUserRouter.put(
  "/admin/user/:id",
  authenticateAdmin,
  isAdmin,
  adminUserController.updateUser,
);

// Delete a user
adminUserRouter.delete(
  "/admin/user/:id",
  authenticateAdmin,
  isAdmin,
  adminUserController.deleteUser,
);
