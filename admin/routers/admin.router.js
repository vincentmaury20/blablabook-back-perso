import { Router } from "express";
import { adminController } from "../controllers/index.js";
import { authenticate } from "../../middlewares/authentification.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";

export const adminRouter = Router();

adminRouter.get("/admin", authenticate, isAdmin, adminController.getDashboard);