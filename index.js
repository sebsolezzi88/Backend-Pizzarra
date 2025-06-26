import express from 'express';
import dotenv from 'dotenv';

//Cargar variable de entorno
dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(express.json()); //Para leer los json

app.listen(PORT, ()=>{
    console.log(`Server Express corriendo en puerto ${PORT}`);
})



