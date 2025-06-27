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