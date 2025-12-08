import { Router } from "express";
import { adminAuthorController } from "../controllers/admin.author.controller.js";
import { authenticateAdmin } from "../middlewares/authenticateAdmin.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";

export const adminAuthorRouter = Router();

// Liste des auteurs
adminAuthorRouter.get("/admin/authors", authenticateAdmin, isAdmin, adminAuthorController.getAuthors);

// Détail
adminAuthorRouter.get("/admin/author/:id", authenticateAdmin, isAdmin, adminAuthorController.getAuthorById);