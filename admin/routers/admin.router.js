import { Router } from "express";
import { adminController } from "../controllers/index.js";
import { authenticateAdmin } from "../middlewares/authenticateAdmin.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";

export const adminRouter = Router();

// Le dashboard
adminRouter.get("/admin", authenticateAdmin, isAdmin, adminController.getDashboard);

// Formulaire de login
adminRouter.get("/admin/login", adminController.getLogin);

// Soumission du formulaire de login
adminRouter.post("/admin/login", adminController.postLogin);

// Déconnexion de l'admin
adminRouter.get("/admin/logout", adminController.logout);
