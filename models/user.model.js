import { DataTypes, Model } from "sequelize";
import { sequelize } from "./sequelize.client.js";

export class User extends Model { }

User.init(
   {
      name: { type: DataTypes.STRING(50), allowNull: false },
      firstname: { type: DataTypes.STRING(50), allowNull: false },
      age: { type: DataTypes.INTEGER },
      role: { type: DataTypes.ENUM("user", "admin"), defaultValue: "user" },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING(100), allowNull: false },
      avatar: { type: DataTypes.STRING(100), allowNull: true },

      // ✅ Ajout explicite
      createdAt: {
         type: DataTypes.DATE,
         field: "created_at",
      },
      updatedAt: {
         type: DataTypes.DATE,
         field: "updated_at",
      },
   },
   {
      sequelize,
      tableName: "user",
      timestamps: true,
      underscored: true,
   }
);