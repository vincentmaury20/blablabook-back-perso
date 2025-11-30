import { Genre, Book } from "../../models/index.js";

export const adminGenreController = {

   // Récupérer tous les genres avec leurs livres associés
   async getGenres(req, res) {
      try {
         const genres = await Genre.findAll({
            include: [
               { model: Book, as: "books" }
            ]
         });
         res.json(genres);
      } catch (error) {
         res.status(500).json({ error: "Erreur lors de la récupération des genres" });
      }
   },

   // Récupérer un genre par ID
   async getGenreById(req, res) {
      try {
         const genre = await Genre.findByPk(req.params.id, {
            include: [
               { model: Book, as: "books" }
            ]
         });
         if (!genre) return res.status(404).json({ error: "Genre non trouvé" });
         res.json(genre);
      } catch (error) {
         res.status(500).json({ error: "Erreur serveur" });
      }
   },

   // Créer un genre avec éventuellement des livres associés
   async createGenre(req, res) {
      try {
         const { name, books } = req.body;

         // Création du genre
         const genre = await Genre.create({ name });

         // Associations (si fournies)
         if (books && books.length > 0) {
            await genre.setBooks(books); // Sequelize génère genre.setBooks()
         }

         res.status(201).json(genre);
      } catch (error) {
         res.status(500).json({ error: "Erreur lors de la création du genre" });
      }
   },

   // Mettre à jour un genre
   async updateGenre(req, res) {
      try {
         const { id } = req.params;
         const { name, books } = req.body;

         const genre = await Genre.findByPk(id);
         if (!genre) {
            return res.status(404).json({ message: "Genre non trouvé." });
         }

         await genre.update({ name });

         // Mettre à jour les associations
         if (books) {
            await genre.setBooks(books);
         }

         res.status(200).json({
            message: "Genre mis à jour avec succès",
            genre,
         });
      } catch (error) {
         res.status(500).json({ error: "Erreur lors de la mise à jour du genre" });
      }
   },

   // Supprimer un genre
   async deleteGenre(req, res) {
      try {
         const { id } = req.params;
         const genre = await Genre.findByPk(id);

         if (!genre) {
            return res.status(404).json({ message: "Genre non trouvé." });
         }

         await genre.destroy();
         res.status(200).json({ message: "Genre supprimé avec succès" });
      } catch (error) {
         res.status(500).json({ error: "Erreur lors de la suppression du genre" });
      }
   }
};