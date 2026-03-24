import { Router } from "express";
import { adminAuthorController } from "../controllers/admin.author.controller.js";
import { authenticateAdmin } from "../middlewares/authenticateAdmin.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";

export const adminAuthorRouter = Router();

// List all authors
adminAuthorRouter.get(
  "/admin/authors",
  authenticateAdmin,
  isAdmin,
  adminAuthorController.getAuthors,
);

// Render author creation form
adminAuthorRouter.get(
  "/admin/author/create",
  authenticateAdmin,
  isAdmin,
  adminAuthorController.createAuthorForm,
);

// Create a new author
adminAuthorRouter.post(
  "/admin/author",
  authenticateAdmin,
  isAdmin,
  adminAuthorController.createAuthor,
);

// Display author details
adminAuthorRouter.get(
  "/admin/author/:id",
  authenticateAdmin,
  isAdmin,
  adminAuthorController.getAuthorById,
);

// Render edit form
adminAuthorRouter.get(
  "/admin/author/:id/edit",
  authenticateAdmin,
  isAdmin,
  adminAuthorController.editAuthorForm,
);

// Update author information
adminAuthorRouter.put(
  "/admin/author/:id",
  authenticateAdmin,
  isAdmin,
  adminAuthorController.updateAuthor,
);

// Delete an author
adminAuthorRouter.delete(
  "/admin/author/:id",
  authenticateAdmin,
  isAdmin,
  adminAuthorController.deleteAuthor,
);
