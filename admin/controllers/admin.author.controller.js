import { Author, Book, Genre } from "../../models/index.js";

export const adminAuthorController = {
   // Liste
   async getAuthors(req, res) {
      try {
         const authors = await Author.findAll({
            include: [
               { model: Book, as: "books" },
               { model: Genre, as: "genres" }
            ]
         });
         res.render("authors/list", { authors, adminName: req.user.name, title: "Liste des auteurs" });
      } catch (error) {
         res.status(500).render("error", { error: "Erreur lors de la récupération des auteurs" });
      }
   },

   // Détail
   async getAuthorById(req, res) {
      try {
         const author = await Author.findByPk(req.params.id, {
            include: [
               { model: Book, as: "books" },
               { model: Genre, as: "genres" }
            ]
         });
         if (!author) return res.status(404).render("error", { error: "Auteur non trouvé" });
         res.render("authors/detail", { author, adminName: req.user.name, title: "Détail auteur" });
      } catch (error) {
         res.status(500).render("error", { error: "Erreur serveur" });
      }
   },

   // Formulaire création
   async createAuthorForm(req, res) {
      res.render("authors/create", { adminName: req.user.name, title: "Créer un auteur" });
   },

   // Création
   async createAuthor(req, res) {
      try {
         await Author.create(req.body);
         res.redirect("/admin/authors");
      } catch (error) {
         res.status(500).render("error", { error: "Erreur lors de la création de l'auteur" });
      }
   },

   // Formulaire édition
   async editAuthorForm(req, res) {
      try {
         const author = await Author.findByPk(req.params.id, { include: ["books", "genres"] });
         if (!author) return res.status(404).render("error", { error: "Auteur non trouvé" });
         res.render("authors/edit", { author, adminName: req.user.name, title: "Modifier auteur" });
      } catch (error) {
         res.status(500).render("error", { error: "Erreur lors du chargement du formulaire d'édition" });
      }
   },

   // Mise à jour
   async updateAuthor(req, res) {
      try {
         const { id } = req.params;
         const author = await Author.findByPk(id);
         if (!author) return res.status(404).render("error", { error: "Auteur non trouvé" });

         await author.update(req.body);
         res.redirect("/admin/authors");
      } catch (error) {
         res.status(500).render("error", { error: "Erreur lors de la mise à jour de l'auteur" });
      }
   },

   // Suppression
   async deleteAuthor(req, res) {
      try {
         const { id } = req.params;
         const author = await Author.findByPk(id);
         if (!author) return res.status(404).render("error", { error: "Auteur non trouvé" });

         await author.destroy();
         res.redirect("/admin/authors");
      } catch (error) {
         res.status(500).render("error", { error: "Erreur lors de la suppression de l'auteur" });
      }
   }
};