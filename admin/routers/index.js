import { Router } from "express";

import { adminUserRouter } from "./admin.user.router.js";
import { adminBookRouter } from "./admin.book.router.js";
import { adminAuthorRouter } from "./admin.author.router.js";
import { adminGenreRouter } from "./admin.genre.router.js";
import { adminRouter } from "./admin.router.js";
import { adminUserBookRouter } from "./admin.user.book.router.js";
import { adminReviewRouter } from "./admin.review.router.js";

export const adminRouters = Router();

adminRouters.use((req, res, next) => {
  res.locals.adminName = req.user ? req.user.name : null;
  next();
});

adminRouters.use(adminUserRouter);
adminRouters.use(adminBookRouter);
adminRouters.use(adminUserBookRouter);
adminRouters.use(adminAuthorRouter);
adminRouters.use(adminGenreRouter);
adminRouters.use(adminReviewRouter);
adminRouters.use(adminRouter);
