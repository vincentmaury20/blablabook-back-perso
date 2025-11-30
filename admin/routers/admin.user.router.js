import { Router } from "express";
import { adminUserController } from "../controllers/admin.user.controller.js";
import { authenticateAdmin } from "../middlewares/authenticateAdmin.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";
import { User } from "../../models/index.js"; // pour charger un user dans edit

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
   async (req, res) => {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).render("error", { error: "Utilisateur non trouvé" });
      res.render("users/edit", { user, adminName: req.user.name, title: "Modifier utilisateur" });
   }
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