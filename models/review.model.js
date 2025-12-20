import { DataTypes, Model } from "sequelize";
import { sequelize } from './sequelize.client.js';


export class Review extends Model { }


Review.init({
   id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
   },
   rating: {
      type: DataTypes.INTEGER,
      allowNull: false
   },
   comment: {
      type: DataTypes.TEXT,
      allowNull: true
   },
}, {
   sequelize,
   tableName: 'reviews',
   underscored: true
});

