import { Router } from "express";
import { adminGenreController } from "../controllers/admin.genre.controller.js";
import { authenticateAdmin } from "../middlewares/authenticateAdmin.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";

export const adminGenreRouter = Router();

// Liste des genres
adminGenreRouter.get(
  "/admin/genres",
  authenticateAdmin,
  isAdmin,
  adminGenreController.getGenres
);

// Formulaire de création d'un genre
adminGenreRouter.get(
  "/admin/genres/create",
  authenticateAdmin,
  isAdmin,
  adminGenreController.createGenreForm
);

// Création d'un genre
adminGenreRouter.post(
  "/admin/genres/create",
  authenticateAdmin,
  isAdmin,
  adminGenreController.createGenre
);

// Détail d'un genre
adminGenreRouter.get(
  "/admin/genres/:id",
  authenticateAdmin,
  isAdmin,
  adminGenreController.getGenresById
);

// Formulaire d'édition
adminGenreRouter.get(
  "/admin/genres/:id/edit",
  authenticateAdmin,
  isAdmin,
  adminGenreController.editGenreForm
);

// Mise à jour d'un genre
adminGenreRouter.put(
  "/admin/genres/:id",
  authenticateAdmin,
  isAdmin,
  adminGenreController.updateGenre
);

// La suppression
adminGenreRouter.delete(
  "/admin/genres/:id",
  authenticateAdmin,
  isAdmin,
  adminGenreController.deleteGenre
);
