import { Book, Author, Genre } from "../models/index.js";
import { Sequelize, Op } from "sequelize";

export const bookController = {
  async getRandomBooks(req, res) {
    try {
      const books = await Book.findAll({
        order: Sequelize.literal("RANDOM()"),
        limit: 10,
        include: [
          { model: Author, as: "authors", through: { attributes: [] } },
          { model: Genre, as: "genres", through: { attributes: [] } },
        ],
      });
      res.json(books);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération des livres" });
    }
  },

  async getAllBooks(req, res) {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = (page - 1) * limit;

    try {
      const books = await Book.findAll({
        include: [
          { model: Author, as: "authors", through: { attributes: [] } },
          { model: Genre, as: "genres", through: { attributes: [] } },
        ],
        order: [["release_date", "DESC"]],
        limit,
        offset,
      });

      const totalBooks = await Book.count();
      const totalPages = Math.ceil(totalBooks / limit);

      res.json({
        page,
        totalPages,
        totalBooks,
        books,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération des livres" });
    }
  },

  async getBookById(req, res) {
    try {
      const book = await Book.findByPk(req.params.id, {
        include: [
          { model: Author, as: "authors", through: { attributes: [] } },
          { model: Genre, as: "genres", through: { attributes: [] } },
        ],
      });
      // Inclure les auteurs et genres associés include: [Author, Genre]
      if (!book) return res.status(404).json({ error: "Livre non trouvé" });
      res.json(book);
    } catch (error) {
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  async uploadCover(req, res) {
    try {
      const book = await Book.findByPk(req.params.id);
      if (!book) {
        return res.status(404).json({ error: "Book not found" });
      }
      book.cover = `${req.protocol}://${req.get("host")}/uploads/books/images/${
        req.file.filename
      }`;
      await book.save();

      res.status(200).json({
        message: "Cover image uploaded successfully",
        cover_url: book.cover,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async searchBooks(req, res) {
  try {
    const { q, type } = req.query;

    if (!q || q.trim().length < 2) {
      return res.json([]);
    }

    const searchTerm = q.trim();
    const words = searchTerm.split(/\s+/);

    let results = [];

    if (!type || type === "title") {
      // Recherche dans les titres
      results = [...results, ...(await Book.findAll({
        where: {
          [Op.or]: [
            { title: { [Op.iLike]: `%${searchTerm}%` } }
          ]
        },
        include: [{ model: Author, as: "authors" }, { model: Genre, as: "genres" }],
        limit: 10
      }))];
    }

    if (!type || type === "author") {
      // Recherche par auteur
      results = [...results, ...(await Book.findAll({
        include: [
          {
            model: Author,
            as: "authors",
            where: {
              [Op.and]: words.map(word => ({
                [Op.or]: [
                  { firstname: { [Op.iLike]: `%${word}%` } },
                  { name: { [Op.iLike]: `%${word}%` } }
                ]
              }))
            }
          },
          { model: Genre, as: "genres" }
        ],
        limit: 10
      }))];
    }

    if (!type || type === "genre") {
      // Recherche par genre
      results = [...results, ...(await Book.findAll({
        include: [
          { model: Author, as: "authors" },
          {
            model: Genre,
            as: "genres",
            where: { name: { [Op.iLike]: `%${searchTerm}%` } }
          }
        ],
        limit: 10
      }))];
    }

    // Dédupliquer
    const uniqueBooks = results.reduce((acc, book) => {
      if (!acc.find(b => b.id === book.id)) acc.push(book);
      return acc;
    }, []);

    res.json(uniqueBooks.slice(0, 10));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur recherche" });
  }
}

};
