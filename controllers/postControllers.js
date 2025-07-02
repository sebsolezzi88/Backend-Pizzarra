/* import Like from '../models/Like.js';
import Post from '../models/Post.js';
import User from '../models/User.js'; */
import {Like,User,Post,} from '../models/index.js'

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
    try {

        if (!req.body || typeof req.body.content !== 'string') {
          return res.status(400).json({ status: 'error', message: 'content is required' });
        }

        const content = req.body.content;
        const id = req.params.id;
        const user_id = req.user.id;

        if(!content || content.trim() === '' ){
            return res.status(400).json({ status: 'error', message: 'content are required'});
        }
        if(content.length > 250){
            return res.status(400).json({ status: 'error', message: 'the content cannot exceed 250 characters.'});
        }
        const postExists = await Post.findOne({where:{id,user_id}});

        if(!postExists){
          return res.status(404).json({ status: 'error', message: 'post not found.'});
        }
        
        //Actulizar el post
        postExists.content = content;
        await postExists.save();

        return res.status(200).json({status: 'success',message: 'post update successfully',post: postExists });
    } catch (error) {
        console.log(error)
        return res.status(500).json({status:'error', message:'internal server error',error});
    }
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

export const  getPostsByUsername = async (req ,res) =>{
   const { username } = req.params;

  try {
    // Buscar al usuario por nombre
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ status: 'error', message: 'user not found' });
    }

    // Traer los posts por user_id
    const posts = await Post.findAll({
      where: { user_id: user.id },
      order: [['createdAt', 'DESC']],
    });

    return res.status(200).json({
      status: 'success',
      message: 'posts obtained',
      posts,
    });

  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'internal server error',
      error,
    });
  }
}

export const getPostsByUserId = async (req, res) => {
  const { id } = req.params;

  try {
    // Comprobamos si existe el usuario
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ status: 'error', message: 'user not found' });
    }

    // Buscamos todos los posts de ese usuario
    const posts = await Post.findAll({
      where: { user_id: id },
      order: [['createdAt', 'DESC']],
    });

    return res.status(200).json({
      status: 'success',
      message: 'posts obtained',
      posts,
    });

  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'internal server error',
      error,
    });
  }
}


export const  getAllPost = async (req ,res) =>{
    try {
        const posts = await Post.findAll({ 
          order: [['createdAt', 'DESC']],
          include: {
            model: User,
            attributes: ['username'] 
      }
        });
        return res.status(200).json({status:'success', message:'posts obtained',posts});
    } catch (error) {
        return res.status(500).json({status:'error', message:'internal server error',error});
    }
}

export const likePost = async (req, res) => {
  try {
    const post_id = req.params.id;
    const user_id = req.user.id;

    // Verificar si el like ya existe
    const existingLike = await Like.findOne({
      where: { post_id, user_id }
    });

    if (existingLike) {
      return res.status(400).json({ status: 'error', message: 'You already liked this post.' });
    }

    // Crear el like
    const like = await Like.create({ post_id, user_id });

    return res.status(201).json({ status: 'success', message: 'Post liked.', like });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error', message: 'Internal server error', error });
  }
}

export const unlikePost = async (req, res) => {
  try {
    const post_id = req.params.id;
    const user_id = req.user.id;

    const like = await Like.findOne({
      where: { post_id, user_id }
    });

    if (!like) {
      return res.status(404).json({ status: 'error', message: 'Like not found.' });
    }

    await like.destroy();

    return res.status(200).json({ status: 'success', message: 'Like removed.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error', message: 'Internal server error', error });
  }
}

export const getPostLikes = async (req, res) => {
  try {
    const post_id = req.params.id;

    const likes = await Like.findAll({
      where: { post_id },
      include: {
        model: User,
        attributes: ['id', 'username'] // Mostramos solo lo necesario
      }
    });

    return res.status(200).json({ status: 'success', count: likes.length, likes });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error', message: 'Internal server error', error });
  }
}