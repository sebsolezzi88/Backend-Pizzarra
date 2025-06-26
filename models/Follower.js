import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class Follower extends Model {}

Follower.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    follower_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    following_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Follower",
    tableName: "followers",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['follower_id', 'following_id'], // evita seguir más de una vez
      },
    ],
  }
);

export default Follower;