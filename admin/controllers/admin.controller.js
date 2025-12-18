import { User, Book, Author, Genre } from "../../models/index.js";
import jwt from "jsonwebtoken";
import argon2 from "argon2";

export const adminController = {
   async getDashboard(req, res) {
      try {
         const userCount = await User.count();
         const bookCount = await Book.count();
         const authorCount = await Author.count();
         const genreCount = await Genre.count();

         res.render("dashboard", {
            adminName: req.user.name, // récupéré depuis le JWT
            title: "Dashboard",
            stats: {
               users: userCount,
               books: bookCount,
               authors: authorCount,
               genres: genreCount,
            },
            users: await User.findAll({
               limit: 5,
               order: [["createdAt", "DESC"]],
            }),
         });
      } catch (error) {
         res
            .status(500)
            .json({ error: "Erreur lors du chargement du dashboard admin" });
      }
   },

   // GET /admin/login → affiche le formulaire
   getLogin: (req, res) => {
      res.render("login", { error: null });
   },

   // POST /admin/login → traite les identifiants
   postLogin: async (req, res) => {
      const { email, password } = req.body;

      try {
         // Cherche l'utilisateur en base
         const user = await User.findOne({ where: { email } });
         if (!user) {
            return res.render("login", { error: "Utilisateur introuvable" });
         }

         // Vérifie le mot de passe hashé
         const isValid = await argon2.verify(user.password, password);
         if (!isValid) {
            return res.render("login", { error: "Mot de passe incorrect" });
         }

         // Génère le JWT
         const token = jwt.sign(
            { role: user.role, email: user.email, name: user.firstname },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
         );

         // Pose le cookie httpOnly
         res.cookie("authToken", token, {
            httpOnly: true,
            sameSite: "strict",
            secure: false, // true en prod avec HTTPS
         });

         return res.redirect("/admin");
      } catch (err) {
         console.error("Erreur login:", err);
         res.render("login", { error: "Erreur serveur" });
      }
   }
   ,

   logout: (req, res) => {
      res.clearCookie("authToken");
      res.redirect("/admin/login");
   },
};