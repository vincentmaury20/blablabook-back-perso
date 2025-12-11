import { Router } from "express";
import { adminUserController } from "../controllers/admin.user.controller.js";
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
   adminUserController.createUserForm
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
