import { DataTypes, Model } from "sequelize";
import { sequelize } from './sequelize.client.js';

export const Book = sequelize.define('Book', {
   title: {
      type: DataTypes.STRING(255),
      allowNull: false
   },
   release_date: {
      type: DataTypes.DATE,
      allowNull: true
   },
   cover: {
      type: DataTypes.STRING(50),
      allowNull: false
   },
   synopsis: {
      type: DataTypes.STRING(255),
      allowNull: false
   }
}, {
   sequelize,
   tableName: 'Books',
   createdAt: 'created_at',
   updatedAt: 'updated_at',
   underscored: true
});

