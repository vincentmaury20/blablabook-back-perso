import { Router } from "express";
import { reviewController } from "../controllers/index.js";
import { authenticate } from "../middlewares/authentification.middleware.js";

export const reviewRouter = Router();

reviewRouter.get("/books/:id/reviews", reviewController.getReviewsByBook);

reviewRouter.post("/reviews", authenticate, reviewController.createReview);
