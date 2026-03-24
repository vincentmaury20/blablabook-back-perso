import { Router } from "express";
import { adminUserBookController } from "../controllers/admin.user.book.controller.js";
import { authenticateAdmin } from "../middlewares/authenticateAdmin.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";

export const adminUserBookRouter = Router();

// Add a book to a user's list (admin action)
adminUserBookRouter.post(
  "/admin/user/:userId/book/:bookId/add",
  authenticateAdmin,
  isAdmin,
  adminUserBookController.addBookToUser,
);

// Remove a book from a user's list (admin action)
adminUserBookRouter.post(
  "/admin/user/:userId/book/:bookId/remove",
  authenticateAdmin,
  isAdmin,
  adminUserBookController.removeBookToUser,
);

// Update reading status for a user's book (admin action)
adminUserBookRouter.post(
  "/admin/user/:userId/book/:bookId/status",
  authenticateAdmin,
  isAdmin,
  adminUserBookController.updateStatusToUser,
);
