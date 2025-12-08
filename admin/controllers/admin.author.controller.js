import { Author, Book, Genre } from "../../models/index.js";

export const adminAuthorController = {
   // Liste
   async getAuthors(req, res) {
      try {
         const authors = await Author.findAll({
            include: [
               {
                  model: Book,
                  as: "books",
                  include: [{ model: Genre, as: "genres" }]
               }
            ]
         });

         res.render("authors/list", {
            authors,
            adminName: req.user.name,
            title: "Liste des auteurs"
         });
      } catch (error) {
         console.error(error);
         res.status(500).send("Erreur serveur");
      }
   },

   // Détail
   async getAuthorById(req, res) {
      try {
         const author = await Author.findByPk(req.params.id, {
            include: [
               {
                  model: Book,
                  as: "books",
                  include: [{ model: Genre, as: "genres" }]
               }
            ]
         });
         if (!author) return res.status(404).send("Auteur non trouvé");

         res.render("authors/detail", {
            author,
            adminName: req.user.name,
            title: "Détail auteur"
         });
      } catch (error) {
         console.error(error);
         res.status(500).send("Erreur serveur");
      }
   },
   // je n'oublie pas qu'il est tout à fait possible de rajouter des méthodes à ce controller suivant l'évolution de la partie admin
}