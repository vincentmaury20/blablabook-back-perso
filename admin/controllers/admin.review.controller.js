import Joi from "joi";
import { reviewSchema } from "../../schemas/index.js";
import { User, Review, Book } from "../../models/index.js";

export const adminReviewController = {

   async getReviews(req, res) {
      try {
         const reviews = await Review.findAll({
            include: [
               { model: User },
               { model: Book }
            ],
            order: [["created_at", "DESC"]]
         });

         res.render("reviews/list", { reviews, adminName: req.user.name, title: "Gestion des avis" });

      } catch (error) {
         console.error("Erreur récupération reviews admin:", error);
         res.status(500).send("Erreur serveur");
      }
   },

   async createReview(req, res) {
      try {
         // Validation des champs rating, comment, is_published
         const data = Joi.attempt(req.body, reviewSchema);

         // Récupération des IDs
         const { user_id, book_id } = req.body;

         // Création de l'avis
         await Review.create({
            ...data,
            user_id,
            book_id
         });

         res.redirect("/admin/reviews");

      } catch (error) {
         console.error("Erreur createReview:", error);
         res.status(500).send("Erreur serveur");
      }
   },

   async updateReview(req, res) {
      try {
         const { id } = req.params;

         // 1. Récupérer la review
         const review = await Review.findByPk(id);

         if (!review) {
            return res.status(404).send("Review introuvable");
         }

         // 2. Valider les champs rating/comment/is_published
         const data = Joi.attempt(req.body, reviewSchema);

         // 3. Récupérer user_id et book_id envoyés par le formulaire
         const { user_id, book_id } = req.body;

         // 4. Mettre à jour la review
         await review.update({
            ...data,
            user_id,
            book_id
         });

         // 5. Redirection
         res.redirect("/admin/reviews");

      } catch (error) {
         console.error("Erreur updateReview:", error);
         res.status(500).send("Erreur serveur");
      }
   },

   async editReviewForm(req, res) {
      try {
         const { id } = req.params;

         const review = await Review.findByPk(id, {
            include: [
               { model: User },
               { model: Book }
            ]
         });

         if (!review) {
            return res.status(404).send("Review introuvable");
         }

         // Récupérer tous les users et books pour les <select>
         const users = await User.findAll();
         const books = await Book.findAll();

         res.render("admin/reviews/edit", {
            review,
            users,
            books
         });

      } catch (error) {
         console.error("Erreur editReviewForm:", error);
         res.status(500).send("Erreur serveur");
      }
   },

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