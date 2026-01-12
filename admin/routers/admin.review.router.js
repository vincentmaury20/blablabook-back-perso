import { Router } from "express";
import { adminReviewController } from "../controllers/index.js";
import { authenticateAdmin } from "../middlewares/authenticateAdmin.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";

export const adminReviewRouter = Router();

// Liste des reviews

adminReviewRouter.get(
  "/admin/reviews",
  authenticateAdmin,
  isAdmin,
  adminReviewController.getReviews
);

// Formulaire de création d'une review
adminReviewRouter.get(
  "/admin/review/create",
  authenticateAdmin,
  isAdmin,
  adminReviewController.createReviewForm
);

// la création d'une review
adminReviewRouter.post(
  "/admin/review",
  authenticateAdmin,
  isAdmin,
  adminReviewController.createReview
);

// Formulaire d'édition d'une review
adminReviewRouter.get(
  "/admin/review/:id/edit",
  authenticateAdmin,
  isAdmin,
  adminReviewController.editReviewForm
);

// L'update d'une review
adminReviewRouter.put(
  "/admin/review/:id",
  authenticateAdmin,
  isAdmin,
  adminReviewController.updateReview
);

// La suppression
adminReviewRouter.delete(
  "/admin/review/:id",
  authenticateAdmin,
  isAdmin,
  adminReviewController.deleteReview
);

//  Toggle de publish ou non d'une review

adminReviewRouter.post(
  "/admin/review/:id/toggle",
  authenticateAdmin,
  isAdmin,
  adminReviewController.togglePublish
);
