import { Router } from "express";
import { adminGenreController } from "../controllers/admin.genre.controller.js";
import { authenticateAdmin } from "../middlewares/authenticateAdmin.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";

export const adminGenreRouter = Router();

// List all genres
adminGenreRouter.get(
  "/admin/genres",
  authenticateAdmin,
  isAdmin,
  adminGenreController.getGenres,
);

// Render genre creation form
adminGenreRouter.get(
  "/admin/genres/create",
  authenticateAdmin,
  isAdmin,
  adminGenreController.createGenreForm,
);

// Create a new genre
adminGenreRouter.post(
  "/admin/genres/create",
  authenticateAdmin,
  isAdmin,
  adminGenreController.createGenre,
);

// Display genre details
adminGenreRouter.get(
  "/admin/genres/:id",
  authenticateAdmin,
  isAdmin,
  adminGenreController.getGenresById,
);

// Render edit form
adminGenreRouter.get(
  "/admin/genres/:id/edit",
  authenticateAdmin,
  isAdmin,
  adminGenreController.editGenreForm,
);

// Update genre information
adminGenreRouter.put(
  "/admin/genres/:id",
  authenticateAdmin,
  isAdmin,
  adminGenreController.updateGenre,
);

// Delete a genre
adminGenreRouter.delete(
  "/admin/genres/:id",
  authenticateAdmin,
  isAdmin,
  adminGenreController.deleteGenre,
);
