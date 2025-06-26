import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import  jwt  from 'jsonwebtoken';
import User from '../models/User.js';


//obtemos la palabra secreta de las variable de entorno
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const registerUser = async (req,res) => {
    try {
        const {username, password, passwordrep} = req.body;

        //comprobar username
      if(username.trim()==="" || password.trim() === '' ){
        return res.status(400).json({status:'error', message:'username required'});
      }

      if(username.length < 6 || password.length < 6){
        return res.status(400).json({status:'error', message:'user name or password must have at least 6 characters'});
      }

      //Comprobar estacios en el medio o caracteres especiales
      const usernameRegex = /^[a-zA-Z0-9]+$/;
      if (!usernameRegex.test(username)) {
        return res.status(400).json({ status: 'error', message: 'Username must contain only letters and numbers (no spaces or special characters)' });
      }

      //comprobar passwords
      if(password !== passwordrep){
        return res.status(400).json({status:'error', message:'passwords must match'});
      }

      //comprobamos que no exista ese userneme
      const userExists = await User.findOne({where:{username}});
      if(userExists){
        return res.status(400).json({status:'error', message:'username already in use'});
      }
      

      //Hashear la contraseña y guardar el usuario en base de datos
      const passwordHash = await bcrypt.hash(password,10);
      await User.create({username, password:passwordHash});
      return res.status(201).json({status:'success', message:'user created successfully'});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({status:'error', message: 'internal server error'});
    }
}

export const loginUser = async (req,res) =>{
    try {
        
        const {username,password} = req.body;

        if(username === '' || password === ''){
          return res.status(400).json({status:'error', message:'username or password required'});
        }

        const userExists = await User.findOne({where:{username}});
    
        if(!userExists){
          return res.status(400).json({status:'error', message:'username not found'});
        }
        
        if(!await bcrypt.compare(password,userExists.password)){
          return res.status(400).json({status:'error', message:'invalid credentials'});
        }
        //Si los password coincide generamos el token
        const payload = {
          id: userExists.id,
          username: userExists.username
        }
        
        const token = jwt.sign(payload,JWT_SECRET,{ expiresIn: '12h' } ); 
        return res.status(201).json({status:'success', token})
    
      } catch (error) {
         return res.status(500).json({status:'error', message:'internal server error'});
      }
}