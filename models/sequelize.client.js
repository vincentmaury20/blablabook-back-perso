import "dotenv/config";
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
   process.env.DB_URL,
   {
      logging: false, // désactiver les logs de sequelize
      define: {
         createdAt: "created_at", // mapping des nom de champs, pour la récuperation
         updatedAt: "updated_at",
         underscored: true, // synchroniser les champs en snake_case
      }
   }
);
