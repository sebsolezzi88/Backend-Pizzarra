import { Router } from "express";
import { createComment, deleteComment, getCommentsByPost, updateComment } from "../controllers/commentControllers.js";


const router = Router();

// Obtener todos los comentarios de un post
router.get('/post/:postId', getCommentsByPost);

// Crear un comentario (requiere autenticación)
router.post('/:postId', verifyToken, createComment);

// Actualizar un comentario (requiere autenticación y ser dueño del comentario)
router.put('/:id', verifyToken, updateComment);

// Eliminar un comentario (requiere autenticación y ser dueño del comentario)
router.delete('/:id', verifyToken, deleteComment);


export default router;