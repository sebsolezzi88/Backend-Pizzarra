import { Router } from "express";
import { createPost, deletePost, getAllPost } from "../controllers/postControllers.js";
import { verifyToken } from "../middlewares/authMiddleware.js";


const router = Router();

router.get('/',getAllPost);
router.post('/',verifyToken,createPost);
router.delete('/:id',verifyToken,deletePost);


export default router;