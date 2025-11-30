import { User, Book, Author, Genre } from "../../models/index.js";
import jwt from "jsonwebtoken";

export const adminController = {
   async getDashboard(req, res) {
      try {
         const userCount = await User.count();
         const bookCount = await Book.count();
         const authorCount = await Author.count();
         const genreCount = await Genre.count();

         res.render("dashboard", {
            adminName: req.user.name, // récupéré depuis le JWT
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
   postLogin: (req, res) => {
      const { email, password } = req.body;

      // ⚠️ Ici tu mets ta vraie logique de vérification (BDD + hash)
      if (email === "admin@example.com" && password === "adminpass1234!") {
         // Génération du JWT avec le nom de l’admin
         const token = jwt.sign(
            { role: "admin", email, name: "Super Admin" }, // <-- ajout du name
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
         );

         // Pose du cookie httpOnly
         res.cookie("authToken", token, {
            httpOnly: true,
            sameSite: "strict",
            secure: false, // true en prod avec HTTPS
         });

         return res.redirect("/admin");
      }

      // Si identifiants invalides → on réaffiche le formulaire avec erreur
      res.render("login", { error: "Identifiants invalides" });
   },

   logout: (req, res) => {
      res.clearCookie("authToken");
      res.redirect("/admin/login");
   },
};