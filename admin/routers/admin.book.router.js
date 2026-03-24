import { Router } from "express";
import { adminBookController } from "../controllers/admin.book.controller.js";
import { authenticateAdmin } from "../middlewares/authenticateAdmin.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";
import upload from "../../middlewares/uploadCover.middleware.js";

export const adminBookRouter = Router();

// List all books
adminBookRouter.get(
  "/admin/books",
  authenticateAdmin,
  isAdmin,
  adminBookController.getBooks,
);

// Render book creation form
adminBookRouter.get(
  "/admin/book/create",
  authenticateAdmin,
  isAdmin,
  adminBookController.createBookForm,
);

// Create a new book
adminBookRouter.post(
  "/admin/book",
  authenticateAdmin,
  isAdmin,
  upload.single("cover"),
  adminBookController.createBook,
);

// Display book details
adminBookRouter.get(
  "/admin/book/:id",
  authenticateAdmin,
  isAdmin,
  adminBookController.getBookById,
);

// Render edit form
adminBookRouter.get(
  "/admin/book/:id/edit",
  authenticateAdmin,
  isAdmin,
  adminBookController.editBookForm,
);

// Update book information
adminBookRouter.put(
  "/admin/book/:id",
  authenticateAdmin,
  isAdmin,
  upload.single("cover"),
  adminBookController.updateBook,
);

// Delete a book
adminBookRouter.delete(
  "/admin/book/:id",
  authenticateAdmin,
  isAdmin,
  adminBookController.deleteBook,
);
