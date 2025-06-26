import bcrypt from 'bcrypt';
import User from '../models/User.js';


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