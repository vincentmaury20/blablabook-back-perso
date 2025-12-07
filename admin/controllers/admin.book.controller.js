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
         res.status(500).send("Erreur serveur");
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
         res.status(500).send("Erreur serveur");
      }
   },

   // Formulaire création (GET)
   async createBookForm(req, res) {
      try {
         const authors = await Author.findAll();
         const genres = await Genre.findAll();

         res.render("books/create", {
            authors,
            genres,
            adminName: req.user.name,
            title: "Ajouter un livre"
         });
      } catch (error) {
         console.error(error);
         res.status(500).send("Erreur lors du chargement du formulaire");
      }
   },

   // Création (POST)
   async createBook(req, res) {
      try {
         const {
            title,
            release_date,
            synopsis,
            authorIds,
            genreIds,
            newAuthorName,
            newAuthorFirstname,
            newAuthorBio
         } = req.body;

         // 1) Créer le livre avec la couverture
         const book = await Book.create({
            title,
            release_date,
            synopsis,
            cover: req.file ? `/uploads/${req.file.filename}` : null
         });

         // 2) Associer des auteurs existants
         if (authorIds) {
            const ids = Array.isArray(authorIds) ? authorIds : [authorIds];
            await book.addAuthors(ids);
         }

         // 3) Créer un nouvel auteur si renseigné
         if (newAuthorName && newAuthorFirstname) {
            const [newAuthor] = await Author.findOrCreate({
               where: { name: newAuthorName, firstname: newAuthorFirstname },
               defaults: { bio: newAuthorBio || "" }
            });
            await book.addAuthor(newAuthor);
         }

         // 4) Associer des genres
         if (genreIds) {
            const ids = Array.isArray(genreIds) ? genreIds : [genreIds];
            await book.addGenres(ids);
         }

         res.redirect("/admin/books");
      } catch (error) {
         console.error(error);
         res.status(500).send("Erreur lors de la création du livre");
      }
   },

   // Formulaire édition (GET)
   async editBookForm(req, res) {
      try {
         const book = await Book.findByPk(req.params.id, { include: ["authors", "genres"] });
         if (!book) return res.status(404).send("Livre non trouvé");

         const authors = await Author.findAll();
         const genres = await Genre.findAll();

         res.render("books/edit", {
            book,
            authors,
            genres,
            adminName: req.user.name,
            title: "Modifier livre"
         });
      } catch (error) {
         res.status(500).send("Erreur serveur");
      }
   },

   // Mise à jour (PUT)
   async updateBook(req, res) {
      try {
         const { id } = req.params;
         const book = await Book.findByPk(id);
         if (!book) return res.status(404).send("Livre non trouvé");

         const updateData = {
            ...req.body,
            cover: req.file ? `/uploads/${req.file.filename}` : book.cover
         };

         await book.update(updateData);
         res.redirect("/admin/books");
      } catch (error) {
         res.status(500).send("Erreur serveur");
      }
   },

   // Suppression
   async deleteBook(req, res) {
      try {
         const { id } = req.params;
         const book = await Book.findByPk(id);
         if (!book) return res.status(404).send("Livre non trouvé");

         await book.destroy();
         res.redirect("/admin/books");
      } catch (error) {
         res.status(500).send("Erreur serveur");
      }
   }
};