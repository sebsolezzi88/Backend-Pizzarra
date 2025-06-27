import Comment from '../models/Comment.js';
import Post from '../models/Post.js';

export const createComment = async (req , res) =>{
    try {

        // Validar existencia del parámetro en la URL
        const post_id = req.params.postId;
        if (!post_id || parseInt(isNaN(post_id))) {
            return res.status(400).json({ status: 'error', message: 'post ID is required and must be a number' });
        }
        
        // Validar el body
        if (!req.body || typeof req.body.content !== 'string') {
          return res.status(400).json({ status: 'error', message: 'content is required' });
        }

        const content = req.body.content;
        const user_id = req.user.id;

        if(!content || content.trim() === '' ){
            return res.status(400).json({ status: 'error', message: 'content are required'});
        }
        if(content.length > 250){
            return res.status(400).json({ status: 'error', message: 'the content cannot exceed 250 characters.'});
        }
        
        //Validar la existencia del post a comentar
        const postExists = await Post.findOne({ where: { id: post_id } });

        if(!postExists){
          return res.status(404).json({ status: 'error', message: 'post not found.'});
        }
        
        //Crear el comentario
        const comment = await Comment.create({post_id,user_id,content});

        return res.status(201).json({status: 'success',message: 'comment create successfully',comment });
    } catch (error) {
        console.log(error)
        return res.status(500).json({status:'error', message:'internal server error',error});
    }
}

export const updateComment = async (req , res) =>{
    // Validar existencia del parámetro en la URL
    try{
        const id = req.params.id;
        if (!id || parseInt(isNaN(id))) {
            return res.status(400).json({ status: 'error', message: 'comment ID is required and must be a number' });
        }
        // Validar el body
        if (!req.body || typeof req.body.content !== 'string') {
          return res.status(400).json({ status: 'error', message: 'content is required' });
        }
        
        const content = req.body.content;
        const user_id = req.user.id;

        
        //Validar la existencia del comentario a actualizar
        const commentExits = await Comment.findOne({ where: { id:id, user_id:user_id } });

        if(!commentExits){
          return res.status(404).json({ status: 'error', message: 'comment not found.'});
        }
        
        //Actualizar el comentario
        commentExits.content = content;
        await commentExits.save();

        return res.status(200).json({status: 'success',message: 'comment update successfully' });
    } catch (error) {
        console.log(error)
        return res.status(500).json({status:'error', message:'internal server error',error});
    }
}

export const deleteComment = async (req , res) =>{
    // Validar existencia del parámetro en la URL
    try{
        const id = req.params.id;
        if (!id || parseInt(isNaN(id))) {
            return res.status(400).json({ status: 'error', message: 'comment ID is required and must be a number' });
        }
        
        const user_id = req.user.id;

        
        //Validar la existencia del comentario a borrar
        const commentExits = await Comment.findOne({ where: { id:id, user_id:user_id } });

        if(!commentExits){
          return res.status(404).json({ status: 'error', message: 'comment not found.'});
        }
        
        //Borra el comentario
        await commentExits.destroy();

        return res.status(200).json({status: 'success',message: 'comment delete successfully' });
    } catch (error) {
        console.log(error)
        return res.status(500).json({status:'error', message:'internal server error',error});
    }
}

export const getCommentsByPost = async (req , res) =>{
    
}