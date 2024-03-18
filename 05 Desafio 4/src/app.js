import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import __dirname from "./utils.js";
import productsRouter from './routes/productsEndpoint.router.js';
import cartsRouter from './routes/cartsEndpoint.router.js';

//modelo de prueba -- replicar en cart y product, refactorizar codigo, generar 2 code
import viewsRouter from "./routes/views.router.js";

const port = 8080;

const app = express(); 
app.use(express.urlencoded({extended: true}))

app.engine("handlebars", handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/views`);

app.use("/", viewsRouter); 
app.use(express.static(`${__dirname}/../public`)); 

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

const httpServer = app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

const socketServer = new Server(httpServer);

socketServer.on("connection", socket => {
    console.log("Nuevo cliente conectado -----> ", socket.id);

    socket.on("message", data => {
        console.log("Recibi el dato: ", data);
    });

    socket.emit('evento_para_socket_individual', 'Este mensaje sólo lo debe recibir el socket');
    socket.broadcast.emit('evento_para_todos_menos_el_socket_actual', 'Este mensaje lo verán TODOS los sockets conectados menos el socket actual');
    socketServer.emit('evento_para_todos', 'Este mensaje lo reciben TODOS los Sockets conectados');
});