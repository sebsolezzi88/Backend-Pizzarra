import express from 'express';
import dotenv from 'dotenv';
/* import sequelize from './config/database.js';
import './models/Comment.js';
import './models/Follower.js';
import './models/Like.js';
import './models/Post.js';
import './models/User.js';
import './models/index.js'; */


//Cargar variable de entorno
dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(express.json()); //Para leer los json

//Sincronizar tablas DB;
const start = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos exitosa.');
    
    // usa force: true solo para borrar y regrear
    await sequelize.sync({ alter: true }); 
    console.log('✅ Modelos sincronizados con la base de datos.');


  } catch (err) {
    console.error('❌ Error al conectar o sincronizar:', err);
  }
};
//start();

app.listen(PORT, ()=>{
    console.log(`Server Express corriendo en puerto ${PORT}`);
})



