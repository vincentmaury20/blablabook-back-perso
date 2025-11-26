// admin/controllers/admin.author.controller.js
import { Author, Book, User, Genre } from "../../models/index.js";

export const adminAuthorController = {
   // Récupérer tous les auteurs
   async getAuthors(req, res) {
      try {
         const authors = await Author.findAll({
            include: [
               { model: Book, as: "books" },
               { model: Genre, as: "genres" }
            ]
         });
         res.json(authors);
      } catch (error) {
         res.status(500).json({ error: "Erreur lors de la récupération des auteurs" });
      }
   },

   // Récupérer un auteur par ID
   async getAuthorById(req, res) {
      try {
         const author = await Author.findByPk(req.params.id, {
            include: [
               { model: Book, as: "books" },
               { model: Genre, as: "genres" }
            ]
         });
         if (!author) return res.status(404).json({ error: "Auteur non trouvé" });
         res.json(author);
      } catch (error) {
         res.status(500).json({ error: "Erreur serveur" });
      }
   },

   // Créer un auteur
   async createAuthor(req, res) {
      try {
         const author = await Author.create(req.body);
         res.status(201).json(author);
      } catch (error) {
         res.status(500).json({ error: "Erreur lors de la création de l'auteur" });
      }
   },

   // Mettre à jour un auteur
   async updateAuthor(req, res) {
      try {
         const { id } = req.params;
         const author = await Author.findByPk(id);

         if (!author) {
            return res.status(404).json({ message: "Auteur non trouvé." });
         }

         await author.update(req.body);
         res.status(200).json({
            message: "Auteur mis à jour avec succès",
            author,
         });
      } catch (error) {
         res.status(500).json({ error: "Erreur lors de la mise à jour de l'auteur" });
      }
   },

   // Supprimer un auteur
   async deleteAuthor(req, res) {
      try {
         const { id } = req.params;
         const author = await Author.findByPk(id);

         if (!author) {
            return res.status(404).json({ message: "Auteur non trouvé." });
         }

         await author.destroy();
         res.status(200).json({ message: "Auteur supprimé avec succès" });
      } catch (error) {
         res.status(500).json({ error: "Erreur lors de la suppression de l'auteur" });
      }
   }
};