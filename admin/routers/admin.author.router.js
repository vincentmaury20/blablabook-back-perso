import { Router } from "express";
import { adminAuthorController } from "../controllers/admin.author.controller.js";
import { authenticate } from "../../middlewares/authentification.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";


export const adminAuthorRouter = Router();

adminAuthorRouter.get("admin/books", authenticate, isAdmin, adminAuthorController.getAuthors);
adminAuthorRouter.get("admin/author/:id", authenticate, isAdmin, adminAuthorController.getAuthorById);
adminAuthorRouter.put("/admin/author/:id", authenticate, isAdmin, adminAuthorController.updateAuthor);
adminAuthorRouter.delete("/admin/author/:id", authenticate, isAdmin, adminAuthorController.deleteAuthor);
adminAuthorRouter.post("admin/author", authenticate, isAdmin, adminAuthorController.createAuthor);

// Ici c'est le Crud au niveau des auteurs pour le côté admin avec les middlewares d'auth et isAdmin