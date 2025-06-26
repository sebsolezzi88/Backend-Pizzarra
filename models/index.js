import User from './User.js';
import Post from './Post.js';
import Like from './Like.js';
import Follower from './Follower.js';

//Relacions de Tablas

// User y Post
User.hasMany(Post, { foreignKey: 'user_id' });
Post.belongsTo(User, { foreignKey: 'user_id' });

// User y Comment
User.hasMany(Comment, { foreignKey: 'user_id' });
Comment.belongsTo(User, { foreignKey: 'user_id' });

// Post y Comment
Post.hasMany(Comment, { foreignKey: 'post_id' });
Comment.belongsTo(Post, { foreignKey: 'post_id' });

// User y Like
User.hasMany(Like, { foreignKey: 'user_id' });
Like.belongsTo(User, { foreignKey: 'user_id' });

// Post y Like
Post.hasMany(Like, { foreignKey: 'post_id' });
Like.belongsTo(Post, { foreignKey: 'post_id' });

// Followers (relación usuario-usuario)
User.belongsToMany(User, {
  through: Follower,
  as: "Followings",
  foreignKey: "follower_id",
  otherKey: "following_id",
});
User.belongsToMany(User, {
  through: Follower,
  as: "Followers",
  foreignKey: "following_id",
  otherKey: "follower_id",
});
