import { Op } from "sequelize";
import { Book, Author, Genre } from "../../models/index.js";
import dayjs from "dayjs";
import "dayjs/locale/fr.js";


export const adminBookController = {
   // Liste
   async getBooks(req, res) {
      try {
         const search = req.query.search || "";

         // Construction du filtre (même style que getAuthors)
         const where = search
            ? {
               [Op.or]: [
                  { title: { [Op.iLike]: `%${search}%` } },
                  { "$authors.name$": { [Op.iLike]: `%${search}%` } },
                  { "$authors.firstname$": { [Op.iLike]: `%${search}%` } },
                  { "$genres.name$": { [Op.iLike]: `%${search}%` } }
               ]
            }
            : {};

         // Requête avec include + filtre
         const books = await Book.findAll({
            where,
            include: [
               { model: Author, as: "authors" },
               { model: Genre, as: "genres" }
            ]
         });

         // Formatage des dates
         const formattedBooks = books.map(b => ({
            ...b.toJSON(),
            formattedDate: b.release_date
               ? dayjs(b.release_date).locale("fr").format("DD MMMM YYYY")
               : null
         }));

         res.render("books/list", {
            books: formattedBooks,
            search,
            adminName: req.user.name,
            title: "Liste des livres"
         });

      } catch (error) {
         console.error(error);
         res.status(500).send("Erreur serveur");
      }
   }
   ,


   // Détail
   async getBookById(req, res) { // en paramtre req on récupère le livre par son id et en res on envoie la réponse avex la vue/ dans le try on met toutes les données que l'on veut donner à la vue 
      try {
         const book = await Book.findByPk(req.params.id, { // dans la variable book on y mets avec req , ce que le client a cliqué et on va chercher cette id si existant dans notre base de données
            include: [// on met dans ce qu'on veut récupérer avec le livre les auteurs et les genres 
               { model: Author, as: "authors" },
               { model: Genre, as: "genres" }
            ]
         });

         if (!book) {
            return res.status(404).render("error", { error: "Livre non trouvé" });
         }

         const formattedBook = { // dans cette variable formattedBook on met book to json pour cobvertir en objet json surtout pour les dates
            ...book.toJSON(),
            formattedDate: book.release_date
               ? dayjs(book.release_date).locale("fr").format("DD MMMM YYYY")
               : null
         };

         res.render("books/detail", {
            book: formattedBook,
            adminName: req.user.name,
            title: "Détail du livre"
         });
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
         console.log("=== createBook appelé ===");
         console.log("req.body brut:", req.body);
         console.log("req.file:", req.file);

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

         console.log("title:", title);
         console.log("release_date:", release_date);
         console.log("synopsis:", synopsis);
         console.log("authorIds:", authorIds);
         console.log("genreIds:", genreIds);
         console.log("newAuthorName:", newAuthorName, "newAuthorFirstname:", newAuthorFirstname);

         const book = await Book.create({
            title,
            release_date,
            synopsis,
            cover: req.file ? `http://localhost:3000/uploads/books/images/${req.file.filename}` : null
         });
         console.log("Livre créé avec ID:", book.id);

         if (authorIds) {
            const ids = Array.isArray(authorIds) ? authorIds : [authorIds];
            console.log("Association auteurs existants:", ids);
            await book.addAuthors(ids.map(Number));
         }

         if (newAuthorName && newAuthorFirstname) {
            console.log("Création nouvel auteur:", newAuthorFirstname, newAuthorName);
            const [newAuthor] = await Author.findOrCreate({
               where: { name: newAuthorName, firstname: newAuthorFirstname },
               defaults: { bio: newAuthorBio || "" }
            });
            await book.addAuthor(newAuthor);
         }

         if (genreIds) {
            const ids = Array.isArray(genreIds) ? genreIds : [genreIds];
            console.log("Association genres:", ids);
            await book.addGenres(ids.map(Number));
         }

         res.redirect("/admin/books");
      } catch (error) {
         console.error("Erreur createBook:", error);
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
         console.log("=== updateBook appelé ===");
         console.log("req.params:", req.params);
         console.log("req.body brut:", req.body);
         console.log("req.file:", req.file);

         const { id } = req.params;
         const book = await Book.findByPk(id);
         if (!book) {
            console.log("Livre non trouvé pour ID:", id);
            return res.status(404).send("Livre non trouvé");
         }

         const updateData = {
            title: req.body.title,
            release_date: req.body.release_date,
            synopsis: req.body.synopsis,
            cover: req.file ? `/uploads/books/images/${req.file.filename}` : book.cover
         };
         console.log("updateData:", updateData);

         await book.update(updateData);
         console.log("Livre mis à jour:", book.id);

         if (req.body.authors) {
            const authorIds = Array.isArray(req.body.authors) ? req.body.authors : [req.body.authors];
            console.log("Mise à jour auteurs:", authorIds);
            await book.setAuthors(authorIds.map(Number));
         }

         if (req.body.genres) {
            const genreIds = Array.isArray(req.body.genres) ? req.body.genres : [req.body.genres];
            console.log("Mise à jour genres:", genreIds);
            await book.setGenres(genreIds.map(Number));
         }

         res.redirect("/admin/books");
      } catch (error) {
         console.error("Erreur updateBook:", error);
         res.status(500).send("Erreur serveur");
      }
   }
   ,

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













// // Méthode du contrôleur pour afficher le détail d'un livre
// async getBookById(req, res) { 
//   try {
//     // On récupère le livre par son id (req.params.id = l'id passé dans l'URL)
//     // findByPk = "find by primary key" → cherche directement par clé primaire
//     const book = await Book.findByPk(req.params.id, {
//       // include = permet de charger les relations définies dans Sequelize
//       include: [
//         { model: Author, as: "authors" }, // on inclut les auteurs liés au livre
//         { model: Genre, as: "genres" }    // on inclut les genres liés au livre
//       ]
//     });

//     // Si aucun livre n'est trouvé avec cet id → on renvoie une page d'erreur
//     if (!book) {
//       return res.status(404).render("error", { error: "Livre non trouvé" });
//     }

//     // On prépare un objet "propre" pour la vue
//     // book.toJSON() → convertit l'instance Sequelize en objet JS classique
//     // On ajoute une propriété formattedDate pour afficher la date de sortie formatée
//     const formattedBook = {
//       ...book.toJSON(), // on copie toutes les propriétés du livre
//       formattedDate: book.release_date // si release_date existe
//         ? dayjs(book.release_date)     // on utilise dayjs pour formater
//             .locale("fr")              // on met la locale française
//             .format("DD MMMM YYYY")    // format : jour mois année (ex: 05 janvier 2023)
//         : null                         // sinon, on met null
//     };

//     // Enfin, on rend la vue "books/detail.ejs"
//     // On lui passe l'objet formattedBook, le nom de l'admin et un titre
//     res.render("books/detail", {
//       book: formattedBook,
//       adminName: req.user.name,
//       title: "Détail du livre"
//     });

//   } catch (error) {
//     // Si une erreur survient (ex: problème de base de données), on renvoie une erreur serveur
//     res.status(500).send("Erreur serveur");
//   }
// }