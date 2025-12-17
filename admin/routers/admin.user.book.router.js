import { Router } from "express";
import { adminUserBookController } from "../controllers/admin.user.book.controller.js";
import { authenticateAdmin } from "../middlewares/authenticateAdmin.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";

export const adminUserBookRouter = Router();

//  Ajout d'un livre géré par l'admin à un user

adminUserBookRouter.post(
   "/admin/user/:userId/book/:bookId/add",
   authenticateAdmin,
   isAdmin,
   adminUserBookController.addBookToUser
);

//  Suppression d'un livre géré par l'admin à un user
adminUserBookRouter.post(
   "/admin/user/:userId/book/:bookId/remove",
   authenticateAdmin,
   isAdmin,
   adminUserBookController.removeBookToUser
);

//  Mise à jour du statut de lecture d'un livre géré par l'admin à un user
adminUserBookRouter.post(
   "/admin/user/:userId/book/:bookId/status",
   authenticateAdmin,
   isAdmin,
   adminUserBookController.updateStatusToUser
);