import { reviewSchema } from "../../schemas/index.js";
import { User, Review, Book } from "../../models/index.js";

export const adminReviewController = {
  // List all reviews
  async getReviews(req, res) {
    try {
      const reviews = await Review.findAll({
        include: [{ model: User }, { model: Book }],
        order: [["created_at", "DESC"]],
      });

      res.render("reviews/list", {
        reviews,
        title: "Gestion des avis",
      });
    } catch (error) {
      console.error("Erreur récupération reviews admin:", error);
      res.status(500).send("Erreur serveur");
    }
  },

  // Display review details
  async getReviewById(req, res) {
    try {
      const review = await Review.findByPk(req.params.id, {
        include: [{ model: User }, { model: Book }],
      });

      if (!review) {
        return res.status(404).send("Avis introuvable");
      }

      res.render("reviews/detail", {
        review,
        title: "Détail d'un avis",
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Erreur serveur");
    }
  },

  // Render creation form
  async createReviewForm(req, res) {
    try {
      const users = await User.findAll();
      const books = await Book.findAll();

      res.render("reviews/create", {
        title: "Créer un avis",
        users,
        books,
      });
    } catch (error) {
      console.error("Erreur createReviewForm:", error);
      res.status(500).send("Erreur serveur");
    }
  },

  // Create a new review
  async createReview(req, res) {
    try {
      const data = reviewSchema.validate(req.body, { convert: true }).value;
      const { user_id, book_id } = req.body;

      await Review.create({
        ...data,
        user_id,
        book_id,
        is_published: req.body.is_published === "true",
      });

      res.redirect("/admin/reviews");
    } catch (error) {
      console.error("Erreur createReview:", error);
      res.status(500).send("Erreur serveur");
    }
  },

  // Update review information
  async updateReview(req, res) {
    try {
      const { id } = req.params;

      const review = await Review.findByPk(id);
      if (!review) {
        return res.status(404).send("Review introuvable");
      }

      const data = reviewSchema.validate(req.body, {
        allowUnknown: true,
        convert: true,
      }).value;

      const { user_id, book_id } = req.body;

      // Ensure book_id is valid or null
      const safeBookId = book_id && book_id !== "" ? book_id : null;

      await review.update({
        ...data,
        user_id,
        book_id: safeBookId,
        is_published: req.body.is_published === "true",
      });

      res.redirect("/admin/reviews");
    } catch (error) {
      console.error("Erreur updateReview:", error);
      res.status(500).send("Erreur serveur");
    }
  },

  // Render edit form
  async editReviewForm(req, res) {
    try {
      const { id } = req.params;

      const review = await Review.findByPk(id, {
        include: [{ model: User }, { model: Book }],
      });

      if (!review) {
        return res.status(404).send("Review introuvable");
      }

      const users = await User.findAll();
      const books = await Book.findAll();

      res.render("reviews/edit", {
        title: "Modifier un avis",
        review,
        users,
        books,
        bookMissing: !review.Book,
      });
    } catch (error) {
      console.error("Erreur editReviewForm:", error);
      res.status(500).send("Erreur serveur");
    }
  },

  // Delete a review
  async deleteReview(req, res) {
    try {
      const { id } = req.params;

      const review = await Review.findByPk(id);
      if (!review) {
        return res.status(404).send("Review introuvable");
      }

      await review.destroy();
      res.redirect("/admin/reviews");
    } catch (error) {
      console.error("Erreur deleteReview:", error);
      res.status(500).send("Erreur serveur");
    }
  },

  // Toggle review publication status
  async togglePublish(req, res) {
    try {
      const { id } = req.params;

      const review = await Review.findByPk(id);
      if (!review) {
        return res.status(404).send("Review introuvable");
      }

      review.is_published = !review.is_published;
      await review.save();

      res.redirect("/admin/reviews");
    } catch (error) {
      console.error("Erreur togglePublish:", error);
      res.status(500).send("Erreur serveur");
    }
  },
};
