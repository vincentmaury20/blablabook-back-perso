import { Router } from "express";

// Routers admin
import { adminUserRouter } from "./admin.user.router.js";
import { adminRouter } from "./admin.router.js"; // dashboard global

export const adminRouters = Router();

adminRouters.use(adminUserRouter);
adminRouters.use(adminRouter);