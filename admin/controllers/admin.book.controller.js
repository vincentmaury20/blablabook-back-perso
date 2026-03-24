import { Op } from "sequelize";
import { Book, Author, Genre } from "../../models/index.js";
import dayjs from "dayjs";
import "dayjs/locale/fr.js";

export const adminBookController = {
  // List all books (with optional search)
  async getBooks(req, res) {
    try {
      const search = req.query.search || "";

      const where = search
        ? {
            [Op.or]: [
              { title: { [Op.iLike]: `%${search}%` } },
              { "$authors.name$": { [Op.iLike]: `%${search}%` } },
              { "$authors.firstname$": { [Op.iLike]: `%${search}%` } },
              { "$genres.name$": { [Op.iLike]: `%${search}%` } },
            ],
          }
        : {};

      const books = await Book.findAll({
        where,
        include: [
          { model: Author, as: "authors" },
          { model: Genre, as: "genres" },
        ],
      });

      // Format release date for display
      const formattedBooks = books.map((b) => ({
        ...b.toJSON(),
        formattedDate: b.release_date
          ? dayjs(b.release_date).locale("fr").format("DD MMMM YYYY")
          : null,
      }));

      res.render("books/list", {
        books: formattedBooks,
        search,
        adminName: req.user.name,
        title: "Liste des livres",
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Erreur serveur");
    }
  },

  // Display book details
  async getBookById(req, res) {
    try {
      const book = await Book.findByPk(req.params.id, {
        include: [
          { model: Author, as: "authors" },
          { model: Genre, as: "genres" },
        ],
      });

      if (!book) {
        return res.status(404).render("error", { error: "Livre non trouvé" });
      }

      // Format release date for display
      const formattedBook = {
        ...book.toJSON(),
        formattedDate: book.release_date
          ? dayjs(book.release_date).locale("fr").format("DD MMMM YYYY")
          : null,
      };

      res.render("books/detail", {
        book: formattedBook,
        adminName: req.user.name,
        title: "Détail du livre",
      });
    } catch (error) {
      res.status(500).send("Erreur serveur");
    }
  },

  // Render creation form
  async createBookForm(req, res) {
    try {
      const authors = await Author.findAll();
      const genres = await Genre.findAll();

      res.render("books/create", {
        authors,
        genres,
        adminName: req.user.name,
        title: "Ajouter un livre",
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Erreur lors du chargement du formulaire");
    }
  },

  // Create a new book
  async createBook(req, res) {
    try {
      const { title, release_date, synopsis, authorIds, genreIds } = req.body;

      const book = await Book.create({
        title,
        release_date,
        synopsis,
        cover: req.file
          ? `http://localhost:3000/uploads/books/images/${req.file.filename}`
          : null,
      });

      // Associate authors
      if (authorIds) {
        const ids = Array.isArray(authorIds) ? authorIds : [authorIds];
        await book.addAuthors(ids.map(Number));
      }

      // Associate genres
      if (genreIds) {
        const ids = Array.isArray(genreIds) ? genreIds : [genreIds];
        await book.addGenres(ids.map(Number));
      }

      res.redirect("/admin/books");
    } catch (error) {
      console.error("Erreur createBook:", error);
      res.status(500).send("Erreur lors de la création du livre");
    }
  },

  // Render edit form
  async editBookForm(req, res) {
    try {
      const book = await Book.findByPk(req.params.id, {
        include: ["authors", "genres"],
      });

      if (!book) return res.status(404).send("Livre non trouvé");

      const authors = await Author.findAll();
      const genres = await Genre.findAll();

      res.render("books/edit", {
        book,
        authors,
        genres,
        adminName: req.user.name,
        title: "Modifier livre",
      });
    } catch (error) {
      res.status(500).send("Erreur serveur");
    }
  },

  // Update book information
  async updateBook(req, res) {
    try {
      const { id } = req.params;
      const book = await Book.findByPk(id);

      if (!book) {
        return res.status(404).send("Livre non trouvé");
      }

      const updateData = {
        title: req.body.title,
        release_date: req.body.release_date,
        synopsis: req.body.synopsis,
        cover: req.file
          ? `/uploads/books/images/${req.file.filename}`
          : book.cover,
      };

      await book.update(updateData);

      // Update authors
      if (req.body.authors) {
        const authorIds = Array.isArray(req.body.authors)
          ? req.body.authors
          : [req.body.authors];
        await book.setAuthors(authorIds.map(Number));
      }

      // Update genres
      if (req.body.genres) {
        const genreIds = Array.isArray(req.body.genres)
          ? req.body.genres
          : [req.body.genres];
        await book.setGenres(genreIds.map(Number));
      }

      res.redirect("/admin/books");
    } catch (error) {
      console.error("Erreur updateBook:", error);
      res.status(500).send("Erreur serveur");
    }
  },

  // Delete a book
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
  },
};
