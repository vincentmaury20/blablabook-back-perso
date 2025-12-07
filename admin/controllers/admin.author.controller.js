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

   // Formulaire création (GET)
   async createAuthorForm(req, res) {
      try {
         const books = await Book.findAll();
         const genres = await Genre.findAll();

         res.render("authors/create", {
            books,
            genres,
            adminName: req.user.name,
            title: "Créer un auteur"
         });
      } catch (error) {
         console.error(error);
         res.status(500).send("Erreur lors du chargement du formulaire de création");
      }
   },

   // Création (POST)
   async createAuthor(req, res) {
      try {
         const { name, firstName, bio, book, genre } = req.body;

         // Vérifier si l'auteur existe déjà
         const existingAuthor = await Author.findOne({
            where: { name, firstname: firstName }
         });
         if (existingAuthor) {
            return res.status(403).send("Auteur déjà existant");
         }

         // 1) Créer l'auteur
         const author = await Author.create({
            name,
            firstname: firstName,
            bio
         });

         // 2) Si un livre est renseigné, le créer et l'associer
         if (book && book.trim() !== "") {
            const newBook = await Book.create({
               title: book.trim(),
               synopsis: "Synopsis à compléter"
            });

            await author.addBook(newBook); // remplit la table written_by

            // 3) Si un genre est renseigné, le créer ou le récupérer et l’associer au livre
            if (genre && genre.trim() !== "") {
               const [newGenre] = await Genre.findOrCreate({
                  where: { name: genre.trim() }
               });
               await newBook.addGenre(newGenre); // remplit la table belongs_to
            }
         }

         res.redirect("/admin/authors");
      } catch (error) {
         console.error(error);
         res.status(500).send("Erreur lors de la création de l'auteur");
      }
   },

   // Formulaire édition (GET)
   async editAuthorForm(req, res) {
      try {
         const author = await Author.findByPk(req.params.id, {
            include: [{ model: Book, as: "books" }]
         });
         if (!author) return res.status(404).send("Auteur non trouvé");

         const books = await Book.findAll();
         const genres = await Genre.findAll();

         res.render("authors/edit", {
            author,
            books,
            genres,
            adminName: req.user.name,
            title: "Modifier auteur"
         });
      } catch (error) {
         console.error(error);
         res.status(500).send("Erreur lors du chargement du formulaire d'édition");
      }
   },

   // Mise à jour (PUT)
   async updateAuthor(req, res) {
      try {
         const { id } = req.params;
         const author = await Author.findByPk(id);
         if (!author) return res.status(404).render("error", { error: "Auteur non trouvé" });

         await author.update(req.body);
         res.redirect("/admin/authors");
      } catch (error) {
         console.error(error);
         res.status(500).send("Erreur lors de la mise à jour de l'auteur");
      }
   },

   // Suppression (DELETE)
   async deleteAuthor(req, res) {
      try {
         const { id } = req.params;
         const author = await Author.findByPk(id);
         if (!author) return res.status(404).send("Auteur non trouvé");

         await author.destroy();
         res.redirect("/admin/authors");
      } catch (error) {
         console.error(error);
         res.status(500).send("Erreur lors de la suppression de l'auteur");
      }
   }
};