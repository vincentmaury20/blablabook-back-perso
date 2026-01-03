import { Review, User, Book } from "../models/index.js";

export const reviewController = {

   async getReviewsByBook(req, res) {
      try {
         const bookId = req.params.id;

         const reviews = await Review.findAll({
            where: {
               book_id: bookId,
               is_published: true
            },
            include: [
               { model: User, attributes: ["id", "firstname", "name", "avatar"] },
               { model: Book, attributes: ["id", "title"] }
            ]
         });

         res.json(reviews);

      } catch (error) {
         console.error(error);
         res.status(500).json({ error: "Erreur lors de la récupération des avis." });
      }
   },

   async createReview(req, res) {
      try {
         const { rating, comment, user_id, book_id } = req.body;

         const review = await Review.create({ rating, comment, user_id, book_id });

         res.status(201).json(review);

      } catch (error) {
         console.error(error);
         res.status(500).json({ error: "Erreur lors de la création de l'avis." });
      }
   },

};