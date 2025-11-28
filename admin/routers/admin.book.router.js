import { Router } from "express";
import { adminBookController } from "../controllers/admin.book.controller.js";
import { authenticate } from "../../middlewares/authentification.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";


export const adminBookRouter = Router();

adminBookRouter.get("admin/books", authenticate, isAdmin, adminBookController.getBooks);
adminBookRouter.get("admin/book/:id", authenticate, isAdmin, adminBookController.getBookById);
adminBookRouter.put("/admin/book/:id", authenticate, isAdmin, adminBookController.updateBook);
adminBookRouter.delete("/admin/book/:id", authenticate, isAdmin, adminBookController.deleteBook);
adminBookRouter.post("admin/book", authenticate, isAdmin, adminBookController.createBook);

// Ici c'est le Crud au niveau des livres pour le côté admin avec les middlewares d'auth et isAdmin