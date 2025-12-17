import argon2 from "argon2";
import Joi from "joi";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { loginSchema } from "../schemas/login.schema.js";
import path from 'path';
import fs from 'fs/promises';
import { registerUserSchema } from "../schemas/registerUser.schema.js";

export const userAuthentificationController = {
  async register(req, res) {
    try {
      const { name, email, password, firstname, age } = Joi.attempt(req.body, registerUserSchema);

      const isUserExists = await User.findOne({
        where: { email }
      });

      if (isUserExists) {
        return res.status(409).json({ error: "Utilisateur déjà existant" });
      }

      const hashedPassword = await argon2.hash(password);

      const newUser = await User.create({
        name,
        email,
        firstname,
        age,
        password: hashedPassword,
        avatar: req.file ? req.file.path : null
      });

      // Générer le token
      const token = jwt.sign(
        {
          email: newUser.email,
          role: newUser.role,
          id: newUser.id
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      // Renvoyer le token ET l'utilisateur
      res.status(201).json({
        message: "Compte créé",
        token,
        user: {
          id: newUser.id,
          name: newUser.name,
          firstname: newUser.firstname,
          role: newUser.role,
          email: newUser.email,
          age: newUser.age,
          avatar: newUser.avatar
        }
      });
    } catch (error) {
      console.error("Erreur register :", error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = Joi.attempt(req.body, loginSchema);

      const user = await User.findOne({
        where: { email },
      });

      if (!user) {
        return res.status(404).json({ error: "Utilisateur n'existe pas" });
      }

      const isPasswordValid = await argon2.verify(user.password, password);

      if (!isPasswordValid) {
        return res.status(403).json({ error: "Password is incorrect" });
      }

      const token = jwt.sign(
        {
          email: user.email,
          role: user.role,
          id: user.id
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      // Renvoyer le token ET l'utilisateur
      res.status(200).json({
        message: "Utilisateur connecté",
        token,
        user: {
          id: user.id,
          name: user.name,
          firstname: user.firstname,
          email: user.email,
          age: user.age
        }
      });
    } catch (error) {
      console.error("Erreur login :", error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  async getMe(req, res) {
    try {
      const user = await User.findOne({
        where: { id: req.user.id },
        attributes: ["id", "name", "email", "firstname", "age", "avatar", "role"]
      });

      if (!user) {
        return res.status(404).json({ error: "Utilisateur n'existe pas" });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error("Erreur getMe :", error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },
  async updateUserAvatar(req, res) {
    try {
      // req.user doit être attaché par ton middleware authenticate
      const userId = req.user?.id;
      if (!userId) return res.status(401).json({ error: 'Non authentifié' });

      if (!req.file) return res.status(400).json({ error: 'Fichier manquant' });

      const user = await User.findByPk(userId);
      if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });

      // Optionnel : supprimer l'ancien avatar du disque
      if (user.avatar) {
        try {
          await fs.unlink(path.join(process.cwd(), user.avatar)).catch(() => null);
        } catch (e) {
          console.warn('Suppression ancien avatar échouée', e);
        }
      }

      // Construire le chemin relatif stocké en DB (compatible express.static('/uploads'))
      const avatarPath = path.join('uploads', 'avatars', req.file.filename).replace(/\\/g, '/');
      user.avatar = avatarPath;
      await user.save();

      return res.status(200).json({ avatar: avatarPath });
    } catch (error) {
      console.error('updateUserAvatar error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
};