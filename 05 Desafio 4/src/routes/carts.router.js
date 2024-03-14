import { Router } from "express";
import { CartManager } from "../service/CartManager.js";
import { ProductManager } from "../service/ProductManager.js";

const cartsRouter = Router();
const carts = new CartManager("./src/data/carts.json");
const products = new ProductManager("./src/data/products.json");

cartsRouter.get(`/:cid`, async (req, res) => {
  try {
    const cid = parseInt(req.params.cid, 10);
    const cart = await carts.getCartById(cid);
    if (cart) {
      res.json(cart);
    }
  } catch (error) {
    res.status(404).send({ error: "carrito no existe" });
  }
});

cartsRouter.post(`/`, async (req, res) => {
  try {
    const newCart = await carts.addCart();
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cid = parseInt(req.params.cid, 10);
    const pid = parseInt(req.params.pid, 10);
    const productDetails = await products.getProductById(pid);  
    if(!productDetails){
      return res.status(400).send({error: 'Producto no encontrado'});
    }
    const updateCart = await carts.addProductToACart(cid, productDetails);
    res.status(201).json(updateCart);
  } catch (error) {
    res.status(500).send(
      { status: 'Error', error: error.message }
    );
  }
});

export default cartsRouter;