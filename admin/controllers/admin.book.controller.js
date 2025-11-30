import { Book, Author, Genre } from "../../models/index.js";

export const adminBookController = {
   // Liste
   async getBooks(req, res) {
      try {
         const books = await Book.findAll({
            include: [
               { model: Author, as: "authors" },
               { model: Genre, as: "genres" }
            ]
         });
         res.render("books/list", { books, adminName: req.user.name, title: "Liste des livres" });
      } catch (error) {
         res.status(500).render("error", { error: "Erreur lors de la récupération des livres" });
      }
   },

   // Détail
   async getBookById(req, res) {
      try {
         const book = await Book.findByPk(req.params.id, {
            include: [
               { model: Author, as: "authors" },
               { model: Genre, as: "genres" }
            ]
         });
         if (!book) return res.status(404).render("error", { error: "Livre non trouvé" });
         res.render("books/detail", { book, adminName: req.user.name, title: "Détail du livre" });
      } catch (error) {
         res.status(500).render("error", { error: "Erreur serveur" });
      }
   },

   // Formulaire édition
   async editBookForm(req, res) {
      try {
         const book = await Book.findByPk(req.params.id, { include: ["authors", "genres"] });
         if (!book) return res.status(404).render("error", { error: "Livre non trouvé" });
         res.render("books/edit", { book, adminName: req.user.name, title: "Modifier livre" });
      } catch (error) {
         res.status(500).render("error", { error: "Erreur lors du chargement du formulaire d'édition" });
      }
   },

   // Création
   async createBook(req, res) {
      try {
         await Book.create(req.body);
         res.redirect("/admin/books");
      } catch (error) {
         res.status(500).render("error", { error: "Erreur lors de la création du livre" });
      }
   },

   // Mise à jour
   async updateBook(req, res) {
      try {
         const { id } = req.params;
         const book = await Book.findByPk(id);
         if (!book) return res.status(404).render("error", { error: "Livre non trouvé" });

         await book.update(req.body);
         res.redirect("/admin/books");
      } catch (error) {
         res.status(500).render("error", { error: "Erreur lors de la mise à jour du livre" });
      }
   },

   // Suppression
   async deleteBook(req, res) {
      try {
         const { id } = req.params;
         const book = await Book.findByPk(id);
         if (!book) return res.status(404).render("error", { error: "Livre non trouvé" });

         await book.destroy();
         res.redirect("/admin/books");
      } catch (error) {
         res.status(500).render("error", { error: "Erreur lors de la suppression du livre" });
      }
   }
};