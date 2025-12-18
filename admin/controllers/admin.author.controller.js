import { Author, Book, Genre } from "../../models/index.js";
import Joi from "joi";
import { authorSchema } from "../../schemas/author.schema.js";
import { Op } from "sequelize";


export const adminAuthorController = {
   // Liste
   async getAuthors(req, res) {
      try {
         const search = req.query.search || ""; // récupération du terme de recherche

         // Construction du filtre
         const where = search
            ? {
               [Op.or]: [
                  { name: { [Op.iLike]: `%${search}%` } },
                  { firstname: { [Op.iLike]: `%${search}%` } },
                  { bio: { [Op.iLike]: `%${search}%` } }
               ]
            }
            : {};

         // Requête avec filtre éventuel
         const authors = await Author.findAll({
            where,
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
            search, // pour pré-remplir le champ dans la vue
            adminName: req.user.name,
            title: "Liste des auteurs"
         });

      } catch (error) {
         console.error(error);
         res.status(500).send("Erreur serveur");
      }
   }
   ,

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
   // Formulaire de création
   async createAuthorForm(req, res) {
      try {
         res.render("authors/create", {
            adminName: req.user.name,
            title: "Ajouter un auteur"
         });
      } catch (error) {
         console.error("Erreur createAuthorForm:", error);
         res.status(500).send("Erreur lors du chargement du formulaire");
      }
   },

   // Création en base
   async createAuthor(req, res) {
      try {
         console.log("Body reçu:", req.body);
         const data = Joi.attempt(req.body, authorSchema);
         console.log("Données validées:", data);

         const author = await Author.create(data);
         console.log("Auteur créé:", author.toJSON());

         res.redirect("/admin/authors");
      } catch (error) {
         console.error("Erreur createAuthor:", error);
         res.status(500).send("Erreur lors de la création de l'auteur");
      }
   },

   // Suppression
   async deleteAuthor(req, res) {
      try {
         const author = await Author.findByPk(req.params.id);
         if (!author) {
            return res.status(404).send("Auteur non trouvé");
         }

         await author.destroy();
         console.log("Auteur supprimé avec ID:", author.id);

         res.redirect("/admin/authors");
      } catch (error) {
         console.error("Erreur deleteAuthor:", error);
         res.status(500).render("error", { error: "Erreur lors de la suppression de l'auteur" });
      }
   },
   async editAuthorForm(req, res) {
      try {
         const author = await Author.findByPk(req.params.id);
         if (!author) {
            return res.status(404).send("Auteur non trouvé");
         }

         res.render("authors/edit", {
            author,
            adminName: req.user.name,
            title: "Modifier un auteur"
         });
      } catch (error) {
         console.error("Erreur editAuthorForm:", error);
         res.status(500).send("Erreur lors du chargement du formulaire d'édition");
      }
   },

   // Mise à jour
   async updateAuthor(req, res) {
      try {
         const data = Joi.attempt(req.body, authorSchema);

         const author = await Author.findByPk(req.params.id);
         if (!author) {
            return res.status(404).send("Auteur non trouvé");
         }

         await author.update(data);
         console.log("Auteur mis à jour avec ID:", author.id);

         res.redirect(`/admin/author/${author.id}`);
      } catch (error) {
         console.error("Erreur updateAuthor:", error);
         res.status(500).send("Erreur lors de la mise à jour de l'auteur");
      }
   }
}