import mongoose from 'mongoose';

const connectToDatabase = async () => {
    try {
        await mongoose.connect("mongodb+srv://<user>:<pass>@cluster0.e7prtgh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {dbName: "ecommerce"})
        console.log("conectado a la bbdd en mongo")
    } catch (error) {
        console.log("fallo conexion")
    }
};

export default connectToDatabase;