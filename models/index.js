import User from './User.js';
import Post from './Post.js';


User.hasMany(Post, { foreignKey: "user_id" });
Post.belongsTo(User, { foreignKey: "user_id" });