import { Author, Book, Genre } from "../../models/index.js";
import Joi from "joi";
import { authorSchema } from "../../schemas/author.schema.js";
import { Op } from "sequelize";

export const adminAuthorController = {
  // List all authors (with optional search)
  async getAuthors(req, res) {
    try {
      const search = req.query.search || "";

      const where = search
        ? {
            [Op.or]: [
              { name: { [Op.iLike]: `%${search}%` } },
              { firstname: { [Op.iLike]: `%${search}%` } },
              { bio: { [Op.iLike]: `%${search}%` } },
            ],
          }
        : {};

      const authors = await Author.findAll({
        where,
        include: [
          {
            model: Book,
            as: "books",
            include: [{ model: Genre, as: "genres" }],
          },
        ],
      });

      res.render("authors/list", {
        authors,
        search,
        adminName: req.user.name,
        title: "Liste des auteurs",
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Erreur serveur");
    }
  },

  // Display author details
  async getAuthorById(req, res) {
    try {
      const author = await Author.findByPk(req.params.id, {
        include: [
          {
            model: Book,
            as: "books",
            include: [{ model: Genre, as: "genres" }],
          },
        ],
      });

      if (!author) {
        return res.status(404).send("Auteur non trouvé");
      }

      res.render("authors/detail", {
        author,
        adminName: req.user.name,
        title: "Détail auteur",
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Erreur serveur");
    }
  },

  // Render creation form
  async createAuthorForm(req, res) {
    try {
      res.render("authors/create", {
        adminName: req.user.name,
        title: "Ajouter un auteur",
      });
    } catch (error) {
      console.error("Erreur createAuthorForm:", error);
      res.status(500).send("Erreur lors du chargement du formulaire");
    }
  },

  // Create a new author
  async createAuthor(req, res) {
    try {
      const data = Joi.attempt(req.body, authorSchema);
      await Author.create(data);

      res.redirect("/admin/authors");
    } catch (error) {
      console.error("Erreur createAuthor:", error);
      res.status(500).send("Erreur lors de la création de l'auteur");
    }
  },

  // Delete an author
  async deleteAuthor(req, res) {
    try {
      const author = await Author.findByPk(req.params.id);

      if (!author) {
        return res.status(404).send("Auteur non trouvé");
      }

      await author.destroy();
      res.redirect("/admin/authors");
    } catch (error) {
      console.error("Erreur deleteAuthor:", error);
      res.status(500).render("error", {
        error: "Erreur lors de la suppression de l'auteur",
      });
    }
  },

  // Render edit form
  async editAuthorForm(req, res) {
    try {
      const author = await Author.findByPk(req.params.id);

      if (!author) {
        return res.status(404).send("Auteur non trouvé");
      }

      res.render("authors/edit", {
        author,
        adminName: req.user.name,
        title: "Modifier un auteur",
      });
    } catch (error) {
      console.error("Erreur editAuthorForm:", error);
      res.status(500).send("Erreur lors du chargement du formulaire d'édition");
    }
  },

  // Update author information
  async updateAuthor(req, res) {
    try {
      const data = Joi.attempt(req.body, authorSchema);

      const author = await Author.findByPk(req.params.id);
      if (!author) {
        return res.status(404).send("Auteur non trouvé");
      }

      await author.update(data);
      res.redirect(`/admin/author/${author.id}`);
    } catch (error) {
      console.error("Erreur updateAuthor:", error);
      res.status(500).send("Erreur lors de la mise à jour de l'auteur");
    }
  },
};
