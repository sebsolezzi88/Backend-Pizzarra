import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class Like extends Model {}

Like.init(
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
    post_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Like",
    tableName: "likes",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['user_id', 'post_id'], // evita likes duplicados
      },
    ],
  }
);

export default Like;