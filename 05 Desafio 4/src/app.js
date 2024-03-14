import express from 'express';
import handlebars from 'express-handlebars';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import __dirname from "./utils.js";
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';

const port = 8080;
const app = express(); 
const server = http.createServer(app);
const io = new SocketIOServer(server);

app.use(express.urlencoded({extended: true}))

app.engine("handlebars", handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/views`);

app.use(express.static(`${__dirname}/../public`)); 

app.get('/api', (req, res) => {
    res.send("Ingreso ok")
})

app.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', { productos });
});

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

io.on('connection', (socket) => {
    console.log(`Cliente conectado ${socket.id}`)

    socket.on('evento_personalizado', (data) => {
        console.log(data);
    });

    socket.on('disconnect', () => {
        console.log(`Cliente desconectado ${socket.id}`);
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});