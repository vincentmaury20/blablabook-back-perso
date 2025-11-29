import { Router } from "express";

import { adminUserRouter } from "./admin.user.router.js";
import { adminBookRouter } from "./admin.book.router.js";
import { adminAuthorRouter } from "./admin.author.router.js";
import { adminRouter } from "./admin.router.js";

export const adminRouters = Router();

adminRouters.use(adminUserRouter);
adminRouters.use(adminBookRouter);
adminRouters.use(adminAuthorRouter);
adminRouters.use(adminRouter);