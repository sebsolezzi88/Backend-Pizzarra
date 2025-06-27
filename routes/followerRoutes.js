import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { followUser, followUserByUsername, getFollowers, getFollowersByUsername, getFollowings, getFollowingsByUsername, unfollowUser, unfollowUserByUsername } from '../controllers/followerControllers.js'

const router = Router();

// Seguir a un usuario
router.post('/:id/follow', verifyToken, followUser);

// Dejar de seguir a un usuario
router.delete('/:id/unfollow', verifyToken, unfollowUser);

// Obtener a quién sigue un usuario
router.get('/:id/followings', getFollowings);

// Obtener los seguidores de un usuario
router.get('/:id/followers', getFollowers);

// Obtener seguidores por username
router.get('/username/:username/followers', getFollowersByUsername);

// Obtener seguidos por username
router.get('/username/:username/followings', getFollowingsByUsername);

// Seguir a un usuario por username
router.post('/username/:username/follow', verifyToken, followUserByUsername);

// Dejar de seguir a un usuario por username
router.delete('/username/:username/unfollow', verifyToken, unfollowUserByUsername);

export default router;