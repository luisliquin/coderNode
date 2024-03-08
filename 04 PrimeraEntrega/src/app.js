import express from 'express';
import productsRouter from './routes/carts.js';
import cartsRouter from './routes/products.js';

const port = 8080;
const app = express(); 

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))

//Use routers
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

//servicio
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});