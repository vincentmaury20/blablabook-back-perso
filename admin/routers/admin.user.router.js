import { Router } from "express";
import { adminUserController } from "../controllers/admin.user.controller.js";
import { adminUserBookController } from "../controllers/admin.user.book.controller.js";
import { authenticateAdmin } from "../middlewares/authenticateAdmin.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";


export const adminUserRouter = Router();

// Liste des utilisateurs
adminUserRouter.get(
   "/admin/users",
   authenticateAdmin,
   isAdmin,
   adminUserController.getUsers
);

// Formulaire création
adminUserRouter.get(
   "/admin/user/create",
   authenticateAdmin,
   isAdmin,
   (req, res) => {
      res.render("users/create", { adminName: req.user.name, title: "Créer un utilisateur" });
   }
);

// Création
adminUserRouter.post(
   "/admin/user",
   authenticateAdmin,
   isAdmin,
   adminUserController.createUser
);

// Détail
adminUserRouter.get(
   "/admin/user/:id",
   authenticateAdmin,
   isAdmin,
   adminUserController.getUserById
);

// Formulaire édition
adminUserRouter.get(
   "/admin/user/:id/edit",
   authenticateAdmin,
   isAdmin,
   adminUserController.getUserEditForm
);

// Mise à jour
adminUserRouter.put(
   "/admin/user/:id",
   authenticateAdmin,
   isAdmin,
   adminUserController.updateUser
);

// Suppression
adminUserRouter.delete(
   "/admin/user/:id",
   authenticateAdmin,
   isAdmin,
   adminUserController.deleteUser
);
adminUserRouter.post(
   "/admin/user/:userId/book/add",
   authenticateAdmin,
   isAdmin,
   adminUserBookController.addBook
);

adminUserRouter.post(
   "/admin/user/:userId/book/:bookId/remove",
   authenticateAdmin,
   isAdmin,
   adminUserBookController.removeBook
);

adminUserRouter.post(
   "/admin/user/:userId/book/:bookId/status",
   authenticateAdmin,
   isAdmin,
   adminUserBookController.updateStatus
);