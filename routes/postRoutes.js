import { Router } from "express";
import { createPost, getAllPost } from "../controllers/postControllers.js";
import { verifyToken } from "../middlewares/authMiddleware.js";


const router = Router();

router.get('/',getAllPost);
router.post('/',verifyToken,createPost);

export default router;