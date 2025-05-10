import 'dotenv/config';
import mongoose from 'mongoose';

class dbClient{
    
    constructor(){
        this.conectarBD();
    }

    async conectarBD(){
        const queryString = `mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@${process.env.SERVER_DB}/papeleria?retryWrites=true&w=majority`;
        await mongoose.connect(queryString)
        console.log('Conectado a la base de datos');
    }

    async cerrarBD(){
        try{
            await mongoose.disconnect();
            console.log('Conexion a la base de datos cerrada');
        }catch(e){
            console.log('Error al cerrar la conexion a la base de datos', e);
        }
    }

}

export default new dbClient();