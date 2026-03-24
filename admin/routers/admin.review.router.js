import { Router } from "express";
import { adminReviewController } from "../controllers/index.js";
import { authenticateAdmin } from "../middlewares/authenticateAdmin.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";

export const adminReviewRouter = Router();

// List all reviews
adminReviewRouter.get(
  "/admin/reviews",
  authenticateAdmin,
  isAdmin,
  adminReviewController.getReviews,
);

// Render review creation form
adminReviewRouter.get(
  "/admin/review/create",
  authenticateAdmin,
  isAdmin,
  adminReviewController.createReviewForm,
);

// Create a new review
adminReviewRouter.post(
  "/admin/review",
  authenticateAdmin,
  isAdmin,
  adminReviewController.createReview,
);

// Display review details
adminReviewRouter.get(
  "/admin/review/:id",
  authenticateAdmin,
  isAdmin,
  adminReviewController.getReviewById,
);

// Render edit form
adminReviewRouter.get(
  "/admin/review/:id/edit",
  authenticateAdmin,
  isAdmin,
  adminReviewController.editReviewForm,
);

// Update review information
adminReviewRouter.put(
  "/admin/review/:id",
  authenticateAdmin,
  isAdmin,
  adminReviewController.updateReview,
);

// Delete a review
adminReviewRouter.delete(
  "/admin/review/:id",
  authenticateAdmin,
  isAdmin,
  adminReviewController.deleteReview,
);

// Toggle review publication status
adminReviewRouter.post(
  "/admin/review/:id/toggle",
  authenticateAdmin,
  isAdmin,
  adminReviewController.togglePublish,
);
