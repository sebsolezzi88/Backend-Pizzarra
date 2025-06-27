import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
/* import sequelize from './config/database.js';
import './models/Comment.js';
import './models/Follower.js';
import './models/Like.js';
import './models/Post.js';
import './models/User.js';
import './models/index.js';   */


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


//Rutas de la API
app.use('/api/user',authRoutes);
app.use('/api/post',postRoutes);
app.use('/api/comment',commentRoutes);

app.listen(PORT, ()=>{
    console.log(`Server Express corriendo en puerto ${PORT}`);
})

export default app;


