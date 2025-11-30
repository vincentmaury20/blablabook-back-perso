import { Router } from "express";
import { adminGenreController } from "../controllers/admin.genre.controller.js";
import { authenticate } from "../../middlewares/authentification.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";


export const adminGenreRouter = Router();

adminGenreRouter.get("admin/genres", authenticate, isAdmin, adminGenreController.getGenres);
adminGenreRouter.get("admin/genre/:id", authenticate, isAdmin, adminGenreController.getGenreById);
adminGenreRouter.put("/admin/genre/:id", authenticate, isAdmin, adminGenreController.updateGenre);
adminGenreRouter.delete("/admin/genre/:id", authenticate, isAdmin, adminGenreController.deleteGenre);
adminGenreRouter.post("admin/genre", authenticate, isAdmin, adminGenreController.createGenre);

// Ici c'est le Crud au niveau des livres pour le côté admin avec les middlewares d'auth et isAdmin