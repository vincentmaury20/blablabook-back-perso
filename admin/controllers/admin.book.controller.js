import { Book, Author, User, Genre } from "../../models/index.js";


export const adminBookController = {

   async getBooks(req, res) {
      try {
         const books = await Book.findAll({
            include: [
               { model: Author, as: "authors" },
               { model: Genre, as: "genres" }
            ]
         });
         res.json(books);
      } catch (error) {
         res.status(500).json({ error: "Erreur lors de la récupération des livres" });
      }
   },

   // Récupérer un livre par ID
   async getBookById(req, res) {
      try {
         const book = await Book.findByPk(req.params.id, {
            include: [
               { model: Author, as: "authors" },
               { model: Genre, as: "genres" }
            ]
         });
         if (!book) return res.status(404).json({ error: "Livre non trouvé" });
         res.json(book);
      } catch (error) {
         res.status(500).json({ error: "Erreur serveur" });
      }
   },

   // Créer un livre
   async createBook(req, res) {
      try {
         const book = await Book.create(req.body);
         res.status(201).json(book);
      } catch (error) {
         res.status(500).json({ error: "Erreur lors de la création du livre" });
      }
   },

   // Mettre à jour un livre
   async updateBook(req, res) {
      try {
         const { id } = req.params;
         const book = await Book.findByPk(id);

         if (!book) {
            return res.status(404).json({ message: "Livre non trouvé." });
         }

         await book.update(req.body);
         res.status(200).json({
            message: "Livre mis à jour avec succès",
            book,
         });
      } catch (error) {
         res.status(500).json({ error: "Erreur lors de la mise à jour du livre" });
      }
   },

   // Supprimer un livre
   async deleteBook(req, res) {
      try {
         const { id } = req.params;
         const book = await Book.findByPk(id);

         if (!book) {
            return res.status(404).json({ message: "Livre non trouvé." });
         }

         await book.destroy();
         res.status(200).json({ message: "Livre supprimé avec succès" });
      } catch (error) {
         res.status(500).json({ error: "Erreur lors de la suppression du livre" });
      }
   }
};