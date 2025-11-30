import { Genre, Book } from "../../models/index.js";

export const adminGenreController = {

   // Afficher tous les genres avec leurs livres associés
   async getGenres(req, res) {
      try {
         const genres = await Genre.findAll({
            include: [{ model: Book, as: "books" }]
         });

         // On rend la vue EJS avec les données
         res.render("genres", {
            genres,
            adminName: req.user.name // affichage du nom de l'admin
         });
      } catch (error) {
         res.status(500).render("error", { error: "Erreur lors de la récupération des genres" });
      }
   },

   // Créer un genre
   async createGenre(req, res) {
      try {
         const { name, books } = req.body;
         const genre = await Genre.create({ name });

         if (books && books.length > 0) {
            await genre.setBooks(books);
         }

         res.redirect("/admin/genres"); // redirection vers la liste
      } catch (error) {
         res.status(500).render("error", { error: "Erreur lors de la création du genre" });
      }
   },

   // Mettre à jour un genre
   async updateGenre(req, res) {
      try {
         const { id } = req.params;
         const { name, books } = req.body;

         const genre = await Genre.findByPk(id);
         if (!genre) {
            return res.status(404).render("error", { error: "Genre non trouvé" });
         }

         await genre.update({ name });

         if (books) {
            await genre.setBooks(books);
         }

         res.redirect("/admin/genres");
      } catch (error) {
         res.status(500).render("error", { error: "Erreur lors de la mise à jour du genre" });
      }
   },

   // Supprimer un genre
   async deleteGenre(req, res) {
      try {
         const { id } = req.params;
         const genre = await Genre.findByPk(id);

         if (!genre) {
            return res.status(404).render("error", { error: "Genre non trouvé" });
         }

         await genre.destroy();
         res.redirect("/admin/genres");
      } catch (error) {
         res.status(500).render("error", { error: "Erreur lors de la suppression du genre" });
      }
   }
};