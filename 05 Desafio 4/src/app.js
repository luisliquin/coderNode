import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import __dirname from "./utils.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import { ProductManager } from "./service/ProductManager.js";

const port = 8080;
const app = express();
const products = new ProductManager();

app.use(express.static(`${__dirname}/../public`));

app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use("/", viewsRouter);

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

const httpServer = app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
  console.log("Cliente conectado: ", socket.id);

  socket.on("requestProducts", async () => {
    const productList = await products.getProducts();
    socket.emit("productList", productList);
  });
});
