import { User, sequelize } from "../models/index.js";

console.log("🌱 Seeding des tables...");

const user = await User.create({
   name: "Doe",
   firstname: "John",
   age: 25,
   role: "user",
   email: "John@Doe.example",
   password: "123456abc",
   avatar: "😂"
});


console.log("🎉 Seeding terminé avec succès");
await sequelize.close();