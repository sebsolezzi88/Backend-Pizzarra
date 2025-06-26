import { Router } from "express";
import { createPost, getAllPost } from "../controllers/postControllers.js";


const router = Router();

router.get('/',getAllPost);
router.post('/',createPost);

export default router;