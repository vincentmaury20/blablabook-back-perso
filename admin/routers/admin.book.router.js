import { Router } from "express";
import { adminBookController } from "../controllers/admin.book.controller.js";
import { authenticateAdmin } from "../middlewares/authenticateAdmin.middleware.js";
// import multer from "multer";
// const upload = multer({ dest: "uploads/books/images" });

import { isAdmin } from "../middlewares/isAdmin.middleware.js";
import upload from "../../middlewares/uploadCover.middleware.js";
export const adminBookRouter = Router();

// Liste des livres
adminBookRouter.get(
  "/admin/books",
  authenticateAdmin,
  isAdmin,
  adminBookController.getBooks
);

// Le formulaire de création d'un livre
adminBookRouter.get(
  "/admin/book/create",
  authenticateAdmin,
  isAdmin,
  adminBookController.createBookForm
);

// Création d'un livre
adminBookRouter.post(
  "/admin/book",
  authenticateAdmin,
  isAdmin,
  upload.single("cover"),
  adminBookController.createBook
);

// Détail d'un livre
adminBookRouter.get(
  "/admin/book/:id",
  authenticateAdmin,
  isAdmin,
  adminBookController.getBookById
);

// Le formulaire d'édition d'un livre
adminBookRouter.get(
  "/admin/book/:id/edit",
  authenticateAdmin,
  isAdmin,
  adminBookController.editBookForm
);

// L'update du livre
adminBookRouter.put(
  "/admin/book/:id",
  authenticateAdmin,
  isAdmin,
  upload.single("cover"),
  adminBookController.updateBook
);

// la suppression
adminBookRouter.delete(
  "/admin/book/:id",
  authenticateAdmin,
  isAdmin,
  adminBookController.deleteBook
);
