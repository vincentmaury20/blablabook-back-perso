import { User, sequelize } from "../models/index.js";
import { Book } from "../models/index.js";
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
})

// Voici notre première liaison avec le peu de données que nous avons

await user.addBook(book); // associer le user au book




console.log("🎉 Seeding terminé avec succès");
await sequelize.close();

