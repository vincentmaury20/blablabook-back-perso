import { User } from "./user.model.js";
import { Book } from "./book.model.js";
import { Author } from "./author.model.js";
import { sequelize } from "./sequelize.client.js";

User.belongsToMany(Book, {
   through: "user_has_book", // création d'une table de liaison avec un nom spécifique
   foreignKey: "user_id",
   otherKey: "book_id",
   as: "books",
});
Book.belongsToMany(User, {
   through: "user_has_book",
   foreignKey: "book_id",
   otherKey: "user_id",
   as: "users",
});

export { User, Book, Author, sequelize }