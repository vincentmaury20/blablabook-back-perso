import { Router } from "express";
import { adminAuthorController } from "../controllers/admin.author.controller.js";
import { authenticateAdmin } from "../middlewares/authenticateAdmin.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";

export const adminAuthorRouter = Router();

// Liste des auteurs
adminAuthorRouter.get("/admin/authors", authenticateAdmin, isAdmin, adminAuthorController.getAuthors);

// Formulaire création
adminAuthorRouter.get("/admin/author/create", authenticateAdmin, isAdmin, adminAuthorController.createAuthorForm);

// Création
adminAuthorRouter.post("/admin/author", authenticateAdmin, isAdmin, adminAuthorController.createAuthor);

// Détail
adminAuthorRouter.get("/admin/author/:id", authenticateAdmin, isAdmin, adminAuthorController.getAuthorById);

// Formulaire édition
adminAuthorRouter.get("/admin/author/:id/edit", authenticateAdmin, isAdmin, adminAuthorController.editAuthorForm);

// Mise à jour
adminAuthorRouter.put("/admin/author/:id", authenticateAdmin, isAdmin, adminAuthorController.updateAuthor);

// Suppression
adminAuthorRouter.delete("/admin/author/:id", authenticateAdmin, isAdmin, adminAuthorController.deleteAuthor);