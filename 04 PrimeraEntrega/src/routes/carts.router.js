import { Router } from "express";
import { CartManager } from "../service/CartManager.js";
import { ProductManager } from "../service/ProductManager.js";

console.log('ingrese routes carts');
const cartsRouter = Router();
const carts = new CartManager("./src/data/carts.json");
const products = new ProductManager("./src/data/products.json");

//Controller de busqueda por Id
cartsRouter.get(`/:cid`, async (req, res) => {
  try {
    console.log('ingrese get cart');
    const { cid } = req.params;
    const cart = await carts.getCartById(cid);
    if (cart) {
      res.json(cart);
    }
  } catch (error) {
    res.status(404).send({ error: "carrito no existe" });
  }
});

//Controller para agregar un carrito
cartsRouter.post(`/`, async (req, res) => {
  try {
    console.log('ingrese a post cart');
    const newCart = await carts.addCart(req.body);
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

//Controller para agregar un producto en el carrito
cartsRouter.post("/:cid/product/:pid", async (req, res) => {
  try {
    console.log('ingrese a post CartProduct');
    const { cid, pid } = req.params;
    const productDetails = await products.getProductById(pid);  
  } catch (error) {
    res.status(500).send({ error: "Error al agregar el producto al carrito" });
  }
});

export default cartsRouter;