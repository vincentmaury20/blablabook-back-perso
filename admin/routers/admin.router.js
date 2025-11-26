import { Router } from "express";
import { adminController } from "../controllers/index.js"; // ✅ chemin corrigé
import { authenticate } from "../../middlewares/authentification.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";

export const adminRouter = Router();

// Exemple route dashboard
adminRouter.get("/admin", authenticate, isAdmin, adminController.getDashboard);