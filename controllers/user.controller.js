import { Book, Author, Genre, User } from '../models/index.js';
import Joi from "joi";
import { userSchema } from '../schemas/user.schema.js';



export const userController = {



  async createUser(req, res) {
    try {
      console.log("Données reçues :", req.body);
      const data = Joi.attempt(req.body, userSchema);
      const user = await User.create(data);
      res.status(201).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur lors de la création de l'utilisateur" });
    }
  },


  async loginUser(req, res) {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username: username } });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'User not valid' });
    }
  },

  async userAvatar(req, res) {

    try {
      const { userId } = req.params;
      if (!userId) {
        return res.status(400).json({ error: 'UserId is required' });
      }
      user.avatar = req.file.path;
      await user.save();
      res.status(200).json({ message: 'Avatar image uploaded successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};



