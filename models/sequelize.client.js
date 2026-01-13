import "dotenv/config";
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(process.env.DB_URL, {
  logging: false,
  define: {
    createdAt: "created_at",
    updatedAt: "updated_at",
    underscored: true,
  },
});
