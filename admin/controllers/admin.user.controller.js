import { User, Book } from "../../models/index.js";
import Joi from "joi";
import argon2 from "argon2";
import { Op } from "sequelize";
import { userSchema } from "../../schemas/user.schema.js";
import { updateUserSchema } from "../../schemas/updateUser.schema.js";

export const adminUserController = {
  async getUsers(req, res) {
    try {
      const search = req.query.search || "";

      const where = search
        ? {
            [Op.or]: [
              { name: { [Op.iLike]: `%${search}%` } },
              { firstname: { [Op.iLike]: `%${search}%` } },
              { email: { [Op.iLike]: `%${search}%` } },
            ],
          }
        : {};

      const users = await User.findAll({
        where,
        include: [{ model: Book, as: "books", through: { attributes: [] } }],
        order: [["name", "ASC"]],
      });

      res.render("users/list", {
        users,
        search,
        adminName: req.user?.name || "Admin",
        title: "Liste des utilisateurs",
      });
    } catch (error) {
      console.error("Erreur getUsers:", error);
      res.status(500).send("Erreur lors de la récupération des utilisateurs");
    }
  },

  async getUserById(req, res) {
    try {
      const user = await User.findByPk(req.params.id, {
        include: [
          {
            model: Book,
            as: "books",
            through: { attributes: ["toRead"] },
          },
        ],
      });

      if (!user) {
        return res.status(404).send("Utilisateur non trouvé");
      }

      const books = await Book.findAll();

      res.render("users/detail", {
        user,
        books,
        adminName: req.user?.name || "Admin",
        title: "Détail utilisateur",
      });
    } catch (error) {
      console.error("Erreur getUserById:", error);
      res.status(500).send("Erreur serveur");
    }
  },

  async createUserForm(req, res) {
    res.render("users/create", {
      adminName: req.user.name,
      title: "Créer un utilisateur",
    });
  },

  async createUser(req, res) {
    try {
      const data = Joi.attempt(req.body, userSchema);

      const hashedPassword = await argon2.hash(data.password);

      await User.create({ ...data, password: hashedPassword });

      res.redirect("/admin/users");
    } catch (error) {
      console.error("Erreur createUser:", error);

      if (error.name === "SequelizeUniqueConstraintError") {
        return res.render("users/form", {
          error: "Cet email est déjà utilisé",
        });
      }

      res.status(500).send("Erreur lors de la création de l'utilisateur");
    }
  },

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);

      if (!user) {
        return res
          .status(404)
          .render("error", { error: "Utilisateur non trouvé" });
      }

      let books = req.body.books;
      if (books && !Array.isArray(books)) {
        books = [books];
      }
      req.body.books = books;

      const data = Joi.attempt(req.body, updateUserSchema);

      if (books) {
        const bookIds = books.map(Number);
        await user.setBooks(bookIds);
      }

      await user.update(data);

      res.redirect("/admin/users");
    } catch (error) {
      console.error("Erreur updateUser:", error);
      res.status(500).render("error", {
        error: "Erreur lors de la mise à jour de l'utilisateur",
      });
    }
  },

  async getUserEditForm(req, res) {
    try {
      const user = await User.findByPk(req.params.id, {
        include: [{ model: Book, as: "books", through: { attributes: [] } }],
      });

      if (!user) {
        return res
          .status(404)
          .render("error", { error: "Utilisateur non trouvé" });
      }

      const books = await Book.findAll();

      res.render("users/edit", {
        user,
        books,
        adminName: req.user?.name || "Admin",
        title: "Modifier utilisateur",
      });
    } catch (error) {
      console.error("Erreur getUserEditForm:", error);
      res.status(500).render("error", { error: "Erreur serveur" });
    }
  },

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).send("Utilisateur non trouvé");
      }

      await user.destroy();
      res.redirect("/admin/users");
    } catch (error) {
      console.error("Erreur deleteUser:", error);
      res.status(500).send("Erreur lors de la suppression de l'utilisateur");
    }
  },
};
