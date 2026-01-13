import { User } from "./user.model.js";
import { Book } from "./book.model.js";
import { UserBook } from "./userBook.model.js";
import { Genre } from "./genre.model.js";
import { Author } from "./author.model.js";
import { Review } from "./review.model.js";
import { sequelize } from "./sequelize.client.js";

UserBook.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

User.hasMany(UserBook, {
  foreignKey: "user_id",
  as: "userBooks",
});

User.belongsToMany(Book, {
  through: UserBook,
  foreignKey: "user_id",
  as: "books",
});

Book.belongsToMany(User, {
  through: UserBook,
  foreignKey: "book_id",
  as: "users",
});

UserBook.belongsTo(Book, {
  foreignKey: "book_id",
  as: "book",
});

Book.hasMany(UserBook, {
  foreignKey: "book_id",
  as: "userBooks",
});

Genre.belongsToMany(Book, {
  through: "belongs_to",
  foreignKey: "genre_id",
  otherKey: "book_id",
  as: "books",
});

Book.belongsToMany(Genre, {
  through: "belongs_to",
  foreignKey: "book_id",
  otherKey: "genre_id",
  as: "genres",
});

Author.belongsToMany(Book, {
  through: "written_by",
  foreignKey: "author_id",
  otherKey: "book_id",
  as: "books",
});

Book.belongsToMany(Author, {
  through: "written_by",
  foreignKey: "book_id",
  otherKey: "author_id",
  as: "authors",
});

User.hasMany(Review, { foreignKey: "user_id" });
Review.belongsTo(User, { foreignKey: "user_id" });

Book.hasMany(Review, { foreignKey: "book_id" });
Review.belongsTo(Book, { foreignKey: "book_id" });

export { User, Book, Author, Genre, UserBook, Review, sequelize };
