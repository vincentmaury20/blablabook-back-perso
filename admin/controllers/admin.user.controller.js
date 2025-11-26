import { User, Book } from "../../models/index.js";

import Joi from "joi";
import { createUserSchema } from '../../schemas/user.schema.js';
import { updateUserSchema } from "../../schemas/updateUser.schema.js";




export const adminUserController = {


   async getUsers(req, res) {
      try {
         const users = await User.findAll({
            include: [
               { model: Book, as: "books", through: { attributes: [] } },
            ]
         });
         res.json(users);
      } catch (error) {
         res.status(500).json({ error: 'Erreur lors de la récupération des users' });
      }
   },

   async getUserById(req, res) {
      try {
         const user = await User.findByPk(req.params.id,
            {
               include: [
                  { model: Book, as: "books", through: { attributes: [] } },
               ]
            }
         );
         // Inclure les auteurs et genres associés include: [Author, Genre]
         if (!user) return res.status(404).json({ error: 'User non trouvé' });
         res.json(user);
      } catch (error) {
         res.status(500).json({ error: 'Erreur serveur' });
      }
   },

   async createUser(req, res) {
      try {
         console.log("Données reçues :", req.body);
         const data = Joi.attempt(req.body, createUserSchema);
         const user = await User.create(data);
         res.status(201).json(user);
      } catch (error) {
         console.error(error);
         res.status(500).json({ error: "Erreur lors de la création de l'utilisateur" });
      }
   },

   async updateUser(req, res) {
      try {
         const { id } = req.params;
         const user = await User.findByPk(id);

         if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
         }

         // Validation des données reçues
         const data = Joi.attempt(req.body, updateUserSchema);

         // Mise à jour avec les données validées
         await user.update(data);

         res.status(200).json({
            message: "Utilisateur mis à jour avec succès",
            user,
         });
      } catch (error) {
         console.error(error);
         res.status(500).json({ error: "Erreur lors de la mise à jour de l'utilisateur" });
      }
   },


   async deleteUser(req, res) {
      try {
         const { id } = req.params;
         const user = await User.findByPk(id);

         if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
         }

         await user.destroy();
         res.status(200).json({ message: "Utilisateur supprimé avec succès" });
      } catch (error) {
         console.error(error);
         res.status(500).json({ error: "Erreur lors de la suppression de l'utilisateur" });
      }
   }

}