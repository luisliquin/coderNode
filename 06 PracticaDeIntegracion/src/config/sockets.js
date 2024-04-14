import { Server } from "socket.io";
//import { ProductManager } from "../dao/ProductManagerFS.js";
import ProductManagerDB from "../dao/productManagerDB.js";

import __dirname from "../utils/utils.js";

const setupSockets = (server) => {
    const io = new Server(server);
  
    //const products = new ProductManager(`${__dirname}/data/products.json`);
    const products = new ProductManagerDB();

    io.on("connection", async (socket) => {
        console.log("Cliente conectado: ", socket.id);

        const productList = await products.getProducts();
        socket.emit("productList", productList);

        socket.on("addMessage", async messageData => {
            await messagesManagerService.addMessage(messageData.user, messageData.message)
        })
        
        socket.on("getMessages", async () => {
            const message = await messagesManagerService.getMessages()
            socket.emit("receiveMessages", message)
        })

        socket.on("userConnect", data => {
            socket.emit("messageLogs", messages);
            socket.broadcast.emit("newUser", data);
        })
    });
};

export default setupSockets;