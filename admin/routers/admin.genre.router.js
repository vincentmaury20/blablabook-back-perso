import { Router } from "express";
import { adminGenreController } from "../controllers/admin.genre.controller.js";
import { authenticateAdmin } from "../middlewares/authenticateAdmin.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";


export const adminGenreRouter = Router();

adminGenreRouter.get("/admin/genres", authenticateAdmin, isAdmin, adminGenreController.getGenres);
adminGenreRouter.put("/admin/genre/:id", authenticateAdmin, isAdmin, adminGenreController.updateGenre);
adminGenreRouter.delete("/admin/genre/:id", authenticateAdmin, isAdmin, adminGenreController.deleteGenre);
adminGenreRouter.post("/admin/genre", authenticateAdmin, isAdmin, adminGenreController.createGenre);

// Ici c'est le Crud au niveau des livres pour le côté admin avec les middlewares d'auth et isAdmin