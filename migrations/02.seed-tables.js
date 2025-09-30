import { Genre, Book, Author, User, sequelize } from "../models/index.js";

console.log("🌱 Seeding des tables...");

// Notre premier user !
const user = await User.create({
   name: "Doe",
   firstname: "John",
   age: 25,
   role: "user",
   email: "John@Doe.example",
   password: "123456abc",
   avatar: "😂"
});
// notre premier livre
const book = await Book.create({

   title: 'Le Mystère de la Vallée',
   release_date: '2022-05-15',
   cover: 'mystere-vallee.jpg',
   synopsis: 'Un thriller captivant dans une vallée isolée.',
});

const author = await Author.create({
   name: "Dumas",
   firstname: "Alexandre",
});
const genre = await Genre.create({
   name: "Roman",
});


// Voici nos tables de liaison

await user.addBook(book);             // ✅ alias = "books"
await book.addGenre(genre);           // ✅ alias = "genres"
await author.addBook(book);           // ✅ alias = "books"






console.log("🎉 Seeding terminé avec succès");
await sequelize.close();

