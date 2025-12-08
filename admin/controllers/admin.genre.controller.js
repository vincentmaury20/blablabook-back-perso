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
}

// je ne garde que cette méthode pour pouvoir l'utiliser dans admin.book.controller.js et aussi je pourrais create dans le formulaire de création de livre 