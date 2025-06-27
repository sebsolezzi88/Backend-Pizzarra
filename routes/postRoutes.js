import { Router } from "express";
import { createPost, deletePost, getAllPost, getPostsByUserId, getPostsByUsername, updatePost } from "../controllers/postControllers.js";
import { verifyToken } from "../middlewares/authMiddleware.js";


const router = Router();

router.get('/',getAllPost);
router.get('/user/username/:username', getPostsByUsername);
router.get('/user/userid/:id',getPostsByUserId);
router.post('/',verifyToken,createPost);
router.put('/:id',verifyToken,updatePost);
router.delete('/:id',verifyToken,deletePost);

// ---------- Likes ----------
router.post('/:id/like', verifyToken, likePost);
router.delete('/:id/unlike', verifyToken, unlikePost);
router.get('/:id/likes', getPostLikes); 


export default router;