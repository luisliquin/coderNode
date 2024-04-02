import mongoose from 'mongoose';

const connectToDatabase = async () => {
    try{
        await mongoose.connect("mongodb+srv://<user>:<password>@cluster0.u8zhm4a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" , {dbName: "usuarios"})    
        console.log("conectado a la bbdd en mongo")
    }catch(error){
        console.log("fallo conexion")
    }
};

export default connectToDatabase;