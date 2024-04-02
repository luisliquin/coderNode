import { Server } from "socket.io";
import { ProductManager } from "../service/ProductManager.js";
import __dirname from "../utils/utils.js";

const setupSockets = (server) => {
    const io = new Server(server);
    const products = new ProductManager(`${__dirname}/data/products.json`);

    io.on("connection", async (socket) => {
        console.log("Cliente conectado: ", socket.id);
        const productList = await products.getProducts();
        socket.emit("productList", productList);
    });
};

export default setupSockets;