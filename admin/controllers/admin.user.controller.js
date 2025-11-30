import { User, Book } from "../../models/index.js";
import Joi from "joi";
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
            adminName: req.user.name,
            title: "Liste des utilisateurs"
         });
      } catch (error) {
         res.status(500).render("error", { error: "Erreur lors de la récupération des utilisateurs" });
      }
   },

   // Détail d’un utilisateur
   async getUserById(req, res) {
      try {
         const user = await User.findByPk(req.params.id, {
            include: [{ model: Book, as: "books", through: { attributes: [] } }],
         });

         if (!user) return res.status(404).render("error", { error: "Utilisateur non trouvé" });

         res.render("users/detail", {
            user,
            adminName: req.user.name,
            title: "Détail utilisateur"
         });
      } catch (error) {
         res.status(500).render("error", { error: "Erreur serveur" });
      }
   },

   // Formulaire de création
   async createUser(req, res) {
      try {
         const data = Joi.attempt(req.body, userSchema);
         await User.create(data);

         res.redirect("/admin/users"); // retour vers la liste
      } catch (error) {
         console.error(error);
         res.status(500).render("error", { error: "Erreur lors de la création de l'utilisateur" });
      }
   },

   // Formulaire d’édition
   async updateUser(req, res) {
      try {
         const { id } = req.params;
         const user = await User.findByPk(id);

         if (!user) {
            return res.status(404).render("error", { error: "Utilisateur non trouvé" });
         }

         const data = Joi.attempt(req.body, updateUserSchema);
         await user.update(data);

         res.redirect("/admin/users");
      } catch (error) {
         console.error(error);
         res.status(500).render("error", { error: "Erreur lors de la mise à jour de l'utilisateur" });
      }
   },

   // Suppression
   async deleteUser(req, res) {
      try {
         const { id } = req.params;
         const user = await User.findByPk(id);

         if (!user) {
            return res.status(404).render("error", { error: "Utilisateur non trouvé" });
         }

         await user.destroy();
         res.redirect("/admin/users");
      } catch (error) {
         console.error(error);
         res.status(500).render("error", { error: "Erreur lors de la suppression de l'utilisateur" });
      }
   }
};