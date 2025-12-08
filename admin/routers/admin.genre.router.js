import { Router } from "express";
import { adminGenreController } from "../controllers/admin.genre.controller.js";
import { authenticateAdmin } from "../middlewares/authenticateAdmin.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";


export const adminGenreRouter = Router();

adminGenreRouter.get("/admin/genres", authenticateAdmin, isAdmin, adminGenreController.getGenres);
