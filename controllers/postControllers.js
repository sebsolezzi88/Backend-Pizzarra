import Post from '../models/Post.js';

export const  createPost = async (req ,res) =>{
    try {
        const content = req.body.content;
        const user_id = req.user.id;
        if(!content || content.trim() === ''){
            return res.status(400).json({ status: 'error', message: 'content are required'});
        }
        if(content.length > 250){
            return res.status(400).json({ status: 'error', message: 'the content cannot exceed 250 characters.'});
        }
        const newPost = await Post.create({user_id,content});
        return res.status(201).json({status: 'success',message: 'post created successfully',post: newPost });
    } catch (error) {
        console.log(error)
        return res.status(500).json({status:'error', message:'internal server error',error});
    }
}

export const  updatePost = async (req ,res) =>{
    
}
export const  deletePost = async (req ,res) =>{
    
    try {
        const id = req.params.id;
        const user_id = req.user.id;

        // Validar que el ID exista y sea un número válido
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ status: 'error', message: 'invalid or missing post id' });
        }
        
        //buscar el post
        const postExists = await Post.findOne({where:{id,user_id}});
        
        if (!postExists) {
            return res.status(404).json({status:'error', message:'post not found'});
        }
        
        // Eliminar el post
        await postExists.destroy();

        return res.status(200).json({ status:'success', message: 'successfully deleted post' });
        
    } catch (error) {
        return res.status(500).json({status:'error', message:'internal server error', err:error});
    }
}

export const  getAllUserPost = async (req ,res) =>{
    
}

export const  getAllPost = async (req ,res) =>{
    try {
        const posts = await Post.findAll();
        return res.status(200).json({status:'success', message:'posts obtained',posts});
    } catch (error) {
        return res.status(500).json({status:'error', message:'internal server error',error});
    }
}