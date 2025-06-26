import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
   
  },
  {
    sequelize,
    modelName: "Post",
    tableName: "posts",
    timestamps: true, 
  }
);

export default Post;