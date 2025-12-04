import { User, Book, UserBook } from "../../models/index.js";

export const adminUserBookController = {
   // Ajouter un livre à un utilisateur
   async addBook(req, res) {
      try {
         const { userId } = req.params;
         const { bookId, toRead = false } = req.body; // ✅ bookId vient du body

         const user = await User.findByPk(userId);
         if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });

         const book = await Book.findByPk(bookId);
         if (!book) return res.status(404).json({ error: "Livre non trouvé" });

         const existing = await UserBook.findOne({
            where: { user_id: userId, book_id: bookId }
         });
         if (existing) return res.status(400).json({ error: "Déjà associé" });

         await UserBook.create({ user_id: userId, book_id: bookId, toRead });

         res.redirect(`/admin/user/${userId}`);
      } catch (error) {
         console.error("Erreur addBook:", error);
         res.status(500).json({ error: "Erreur lors de l'ajout du livre" });
      }
   },

   // Retirer un livre
   async removeBook(req, res) {
      try {
         const { userId, bookId } = req.params;

         const deleted = await UserBook.destroy({
            where: { user_id: userId, book_id: bookId }
         });
         if (!deleted) return res.status(404).json({ error: "Livre non trouvé dans la liste" });

         res.redirect(`/admin/user/${userId}`);
      } catch (error) {
         console.error("Erreur removeBook:", error);
         res.status(500).json({ error: "Erreur lors de la suppression du livre" });
      }
   },

   // Mettre à jour le statut de lecture
   async updateStatus(req, res) {
      try {
         const { userId, bookId } = req.params;
         const { toRead } = req.body;

         await UserBook.update({ toRead }, { where: { user_id: userId, book_id: bookId } });

         res.redirect(`/admin/user/${userId}`);
      } catch (error) {
         console.error("Erreur updateStatus:", error);
         res.status(500).json({ error: "Erreur lors de la mise à jour du statut" });
      }
   }
};