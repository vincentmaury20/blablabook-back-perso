import { Router } from "express";


import { bookRouter } from "./book.router.js";
import { authorRouter } from "./author.router.js";
import { genreRouter } from "./genre.router.js";
import { userRouter } from "./user.router.js";
import { userbookRouter } from "./userbook.router.js";
import { reviewRouter } from "./review.router.js";


export const publicRouter = Router();

publicRouter.use(reviewRouter);
publicRouter.use(bookRouter);
publicRouter.use(authorRouter);
publicRouter.use(genreRouter);
publicRouter.use(userRouter);
publicRouter.use(userbookRouter);
