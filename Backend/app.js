import 'dotenv/config';
import express from 'express';


const app = express();

try{
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, ()=>console.log('Servido activo en el puerto ' + PORT));
}catch(e){
    console.log(e);
}