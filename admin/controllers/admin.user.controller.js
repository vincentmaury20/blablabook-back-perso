import { User, Book } from "../../models/index.js";
import Joi from "joi";
import argon2 from "argon2";
import { userSchema } from "../../schemas/user.schema.js";
import { updateUserSchema } from "../../schemas/updateUser.schema.js";

export const adminUserController = {

   // Liste des utilisateurs
   async getUsers(req, res) {
      try {
         const users = await User.findAll({
            include: [{ model: Book, as: "books", through: { attributes: [] } }],
         });

         res.render("users/list", {
            users,
            adminName: req.user?.name || "Admin",
            title: "Liste des utilisateurs",
         });
      } catch (error) {
         console.error("Erreur getUsers:", error);
         res.status(500).send("Erreur lors de la récupération des utilisateurs");
      }
   },

   // Détail d’un utilisateur
   // Détail d’un utilisateur
   async getUserById(req, res) {
      try {
         const user = await User.findByPk(req.params.id, {
            include: [
               {
                  model: Book,
                  as: "books",
                  through: { attributes: ["toRead"] } // ✅ inclure l'attribut pivot
               }
            ]
         });

         if (!user) {
            return res.status(404).send("Utilisateur non trouvé");
         }

         // Récupère tous les livres pour le <select multiple> ou pour l'ajout
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

   // Création d’un utilisateur
   async createUser(req, res) {
      try {
         const data = Joi.attempt(req.body, userSchema);

         // Hash du mot de passe
         const hashedPassword = await argon2.hash(data.password);

         await User.create({ ...data, password: hashedPassword });

         res.redirect("/admin/users");
      } catch (error) {
         console.error("Erreur createUser:", error);

         if (error.name === "SequelizeUniqueConstraintError") {
            return res.render("users/form", { error: "Cet email est déjà utilisé" });
         }

         res.status(500).send("Erreur lors de la création de l'utilisateur");
      }
   },

   // Mise à jour d’un utilisateur
   async updateUser(req, res) {
      try {
         const { id } = req.params;
         const user = await User.findByPk(id);

         if (!user) {
            return res.status(404).render("error", { error: "Utilisateur non trouvé" });
         }

         // Normaliser books en tableau
         let books = req.body.books;
         if (books && !Array.isArray(books)) {
            books = [books]; // transforme '19' en ['19']
         }
         req.body.books = books;

         // Validation des données
         const data = Joi.attempt(req.body, updateUserSchema);

         // Mise à jour des associations livres
         if (books) {
            const bookIds = books.map(Number);
            await user.setBooks(bookIds);
         } else {
            await user.setBooks([]);
         }

         // Mise à jour des champs simples
         await user.update(data);

         res.redirect("/admin/users");
      } catch (error) {
         console.error("Erreur updateUser:", error);
         res.status(500).render("error", { error: "Erreur lors de la mise à jour de l'utilisateur" });
      }
   },

   // Formulaire édition
   async getUserEditForm(req, res) {
      try {
         const user = await User.findByPk(req.params.id, {
            include: [{ model: Book, as: "books", through: { attributes: [] } }]
         });

         if (!user) {
            return res.status(404).render("error", { error: "Utilisateur non trouvé" });
         }

         const books = await Book.findAll();

         res.render("users/edit", {
            user,
            books, // ✅ on passe la liste des livres
            adminName: req.user?.name || "Admin",
            title: "Modifier utilisateur"
         });
      } catch (error) {
         console.error("Erreur getUserEditForm:", error);
         res.status(500).render("error", { error: "Erreur serveur" });
      }
   },
   // Suppression d’un utilisateur
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