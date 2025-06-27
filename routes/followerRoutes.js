import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware";

const router = Router();

// Seguir a un usuario
router.post('/:id/follow', verifyToken, followUser);

// Dejar de seguir a un usuario
router.delete('/:id/unfollow', verifyToken, unfollowUser);

// Obtener a quién sigue un usuario
router.get('/:id/followings', getFollowings);

// Obtener los seguidores de un usuario
router.get('/:id/followers', getFollowers);

export default router;