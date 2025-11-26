import { User, Book, Author, Genre } from "../../models/index.js";

export const adminController = {
   async getDashboard(req, res) {
      try {
         const userCount = await User.count();
         const bookCount = await Book.count();
         const authorCount = await Author.count();
         const genreCount = await Genre.count();

         // Rendu EJS
         res.render("admin/dashboard", {
            adminName: req.user.name,
            stats: {
               users: userCount,
               books: bookCount,
               authors: authorCount,
               genres: genreCount,
            },
            users: await User.findAll({ limit: 5, order: [["createdAt", "DESC"]] })
         });
      } catch (error) {
         res.status(500).json({ error: "Erreur lors du chargement du dashboard admin" });
      }
   }
};