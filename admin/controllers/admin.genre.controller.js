import { Op } from "sequelize";
import { Genre, Book } from "../../models/index.js";

export const adminGenreController = {
  // List all genres (with optional search)
  async getGenres(req, res) {
    try {
      const search = req.query.search || "";

      const where = search
        ? {
            [Op.or]: [{ name: { [Op.iLike]: `%${search}%` } }],
          }
        : {};

      const genres = await Genre.findAll({
        where,
        include: [
          {
            model: Book,
            as: "books",
            attributes: ["id", "title"],
          },
        ],
        order: [["name", "ASC"]],
      });

      res.render("genres/list", {
        title: "Genres",
        adminName: req.user.name,
        genres,
        search,
      });
    } catch (error) {
      console.error("Erreur getGenres :", error);
      res.status(500).send("Erreur lors du chargement des genres");
    }
  },

  // Display genre details
  async getGenresById(req, res) {
    try {
      const genre = await Genre.findByPk(req.params.id, {
        include: [
          {
            model: Book,
            as: "books",
            attributes: ["id", "title"],
          },
        ],
      });

      if (!genre) return res.status(404).send("Genre non trouvé");

      res.render("genres/detail", {
        title: "Détail genre",
        adminName: req.user.name,
        genre,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Erreur serveur");
    }
  },

  // Render creation form
  async createGenreForm(req, res) {
    try {
      res.render("genres/create", {
        title: "Ajouter un genre",
        adminName: req.user.name,
      });
    } catch (error) {
      console.error("Erreur createGenreForm:", error);
      res.status(500).send("Erreur lors du chargement du formulaire");
    }
  },

  // Create a new genre
  async createGenre(req, res) {
    try {
      const { name } = req.body;

      if (!name || name.trim() === "") {
        return res.status(400).send("Le nom du genre est obligatoire");
      }

      const genre = await Genre.create({ name });

      res.redirect("/admin/genres");
    } catch (error) {
      console.error("Erreur createGenre:", error);
      res.status(500).send("Erreur lors de la création du genre");
    }
  },

  // Delete a genre
  async deleteGenre(req, res) {
    try {
      const genre = await Genre.findByPk(req.params.id);

      if (!genre) {
        return res.status(404).send("Genre non trouvé");
      }

      await genre.destroy();

      res.redirect("/admin/genres");
    } catch (error) {
      console.error("Erreur deleteGenre:", error);
      res
        .status(500)
        .render("error", { error: "Erreur lors de la suppression du genre" });
    }
  },

  // Render edit form
  async editGenreForm(req, res) {
    try {
      const genre = await Genre.findByPk(req.params.id);

      if (!genre) {
        return res.status(404).send("Genre non trouvé");
      }

      res.render("genres/edit", {
        title: "Modifier un genre",
        adminName: req.user.name,
        genre,
      });
    } catch (error) {
      console.error("Erreur editGenreForm:", error);
      res.status(500).send("Erreur lors du chargement du formulaire d'édition");
    }
  },

  // Update genre information
  async updateGenre(req, res) {
    try {
      const { name } = req.body;

      const genre = await Genre.findByPk(req.params.id);

      if (!genre) {
        return res.status(404).send("Genre non trouvé");
      }

      await genre.update({ name });

      res.redirect(`/admin/genres/${genre.id}`);
    } catch (error) {
      console.error("Erreur updateGenre:", error);
      res.status(500).send("Erreur lors de la mise à jour du genre");
    }
  },
};
