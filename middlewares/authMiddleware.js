import dotenv from 'dotenv';
import  jwt  from 'jsonwebtoken';
import User from '../models/User.js';

//obtemos la palabra secreta de las variable de entorno
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const verifyToken = async (req,res,next) => {
    
     /* Obtener el token de los headers de la solicitud 
        Comúnmente viene en el header 'Authorization' con el prefijo 'Bearer '
    */
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
         return res.status(401).json({ status:'error' ,message: 'token not provided' });
    }

    try {
        const decoded = jwt.verify(token,JWT_SECRET);
        
        //verificar si el usuario esta en la base de datos
        const userExists = await User.findOne({where:{id:decoded.id, username: decoded.username}});
        if(!userExists){
            return res.status(403).json({ status: 'error', message: 'invalid user' });
        }
        //si el usuario existe lo agregamos al request y demjamos seguir
        req.user ={
            id: userExists.id,
            username: userExists.username
        }
        next() //Continua la consulta 
    } catch (error) {
         return res.status(500).json({status:'error', message:'internal server error',error});
    }
}