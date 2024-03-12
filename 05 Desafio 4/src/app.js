import express from 'express';
import handlebars from 'express-handlebars';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import __dirname from "./utils.js";
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';

//Declaracion de constantes
const port = 8080;
const app = express(); 
const server = http.createServer(app);
const io = new SocketIOServer(server);

app.use(express.json());
app.use(express.urlencoded({extended: true}))

//motor de plantillas
app.engine("handlebars", handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/views`);

//Servidor estatico de archivos
app.use(express.static(`${__dirname}/../public`)); 

//Test de ingreso
app.get('/api', (req, res) => {
    res.send("Ingreso ok")
})

//Use routers
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

//servicio
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});