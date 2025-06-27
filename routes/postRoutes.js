import { Router } from "express";
import { createPost, deletePost, getAllPost, getPostsByUserId, getPostsByUsername } from "../controllers/postControllers.js";
import { verifyToken } from "../middlewares/authMiddleware.js";


const router = Router();

router.get('/',getAllPost);
router.get('/user/username/:username', getPostsByUsername);
router.get('/user/userid/:id',getPostsByUserId);
router.post('/',verifyToken,createPost);
router.delete('/:id',verifyToken,deletePost);


export default router;