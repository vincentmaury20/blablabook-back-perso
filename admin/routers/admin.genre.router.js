import { Router } from "express";
import { adminGenreController } from "../controllers/admin.genre.controller.js";
import { authenticateAdmin } from "../middlewares/authenticateAdmin.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";

export const adminGenreRouter = Router();

// LISTE + RECHERCHE
adminGenreRouter.get("/admin/genres", authenticateAdmin, isAdmin, adminGenreController.getGenres);

// FORMULAIRE CRÉATION
adminGenreRouter.get("/admin/genres/create", authenticateAdmin, isAdmin, adminGenreController.createGenreForm);

// CRÉATION
adminGenreRouter.post("/admin/genres/create", authenticateAdmin, isAdmin, adminGenreController.createGenre);

// DÉTAIL
adminGenreRouter.get("/admin/genres/:id", authenticateAdmin, isAdmin, adminGenreController.getGenresById);


// FORMULAIRE ÉDITION
adminGenreRouter.get("/admin/genres/:id/edit", authenticateAdmin, isAdmin, adminGenreController.editGenreForm);

// MISE À JOUR
adminGenreRouter.put("/admin/genres/:id", authenticateAdmin, isAdmin, adminGenreController.updateGenre);

// SUPPRESSION
adminGenreRouter.delete("/admin/genres/:id", authenticateAdmin, isAdmin, adminGenreController.deleteGenre);