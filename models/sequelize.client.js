import "dotenv/config";
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  logging: false,
  dialectOptions: {
    ssl:
      process.env.NODE_ENV === "production"
        ? { require: true, rejectUnauthorized: false }
        : false,
  },
  define: {
    createdAt: "created_at",
    updatedAt: "updated_at",
    underscored: true,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log(
      "✅ Connection to PostgreSQL has been established successfully.",
    );
  })
  .catch((err) => {
    console.error("❌ Unable to connect to the database:", err);
  });
