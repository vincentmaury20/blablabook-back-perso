import { User, Book, Author, Genre } from "../../models/index.js";

export const adminController = {
   async getDashboard(req, res) {
      try {
         const userCount = await User.count();
         const bookCount = await Book.count();
         const authorCount = await Author.count();
         const genreCount = await Genre.count();
         // Dans le bloc try on déclare les variables de chaque modèle et on utilise la méthode count() qui est natif de Sequelize pour récupérer le compte de chaque modèle

         res.render("admin/dashboard", {
            adminName: req.user.name,
            stats: {
               users: userCount,             // res.render et on passe en parmètre l'adminName dans l'objet stats et le nombre d'utilisateurs, de livres, d'auteurs et de genres on injecte les données récupérées dans la vue
               books: bookCount,
               authors: authorCount,
               genres: genreCount,
            },
            users: await User.findAll({ limit: 5, order: [["createdAt", "DESC"]] }) // ici une méthode pour afficher les users dans le dashboard admin mais en poo car en sql natif ce serait plus compliqué 
         });
      } catch (error) {
         res.status(500).json({ error: "Erreur lors du chargement du dashboard admin" });
         // on catch les eventuelles erreur et on renvoie une page 500 avec son message d'erreur
      }
   }
};