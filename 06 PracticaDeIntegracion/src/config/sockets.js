import { Server } from "socket.io";
import { ProductManager } from "../dao/ProductManagerFS.js";
import __dirname from "../utils/utils.js";

const setupSockets = (server) => {
    const io = new Server(server);
    const products = new ProductManager(`${__dirname}/data/products.json`);
    const messages = [];

    io.on("connection", async (socket) => {
        console.log("Cliente conectado: ", socket.id);
        const productList = await products.getProducts();
        socket.emit("productList", productList);

        socket.on("message", data => {
            messages.push(data);
            io.emit("messageLogs", messages);
        }) 

        socket.on("userConnect", data => {
            socket.emit("messageLogs", messages);
            socket.broadcast.emit("newUser", data);
        })
    });
};

export default setupSockets;