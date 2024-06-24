import mongoose from 'mongoose';
import 'dotenv/config'

const mongo_url = process.env.MONGO_URL;
const dbName = process.env.DB_NAME;

const connectToDatabase = async () => {
    try {
        await mongoose.connect(mongo_url, {dbName: dbName})
        console.log("conectado a la bbdd en mongo")
    } catch (error) {
        console.log(`Fallo de conexion a la bbdd: ${error}`);
        process.exit(1);
    }
};

export default connectToDatabase;