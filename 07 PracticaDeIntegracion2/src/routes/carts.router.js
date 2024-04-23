import { Router } from "express";
import CartManagerDB from "../dao/CartManagerDB.js";
import ProductManagerDB from "../dao/ProductManagerDB.js";

const cartsRouter = Router();
const carts = new CartManagerDB();
const products = new ProductManagerDB();

cartsRouter.get("/", async (req, res) => {
  const result = await CartService.getAllCarts();
  return res.status(200).send(result);
});

cartsRouter.get(`/:cid`, async (req, res) => {
  try {
    const cid = req.params.cid;
    const cart = await carts.getCartById(cid);
    res.send({
      status: "success",
      payload: cart,
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error.message,
    });
  }
});

cartsRouter.post(`/`, async (req, res) => {
  try {
    const { products } = req.body;
    const newCart = await carts.addCart(products);
    res.send({
      status: "success", 
      payload: result,
    })
  } catch (error) {
    res.status(400).send({ 
      status: "error",
      message: error.message,
    });
  }
});

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;

    const productDetails = await products.getProductByID(pid);  

    if(!productDetails){
      return res.status(400).send({
        status: "error",
        message: 'Producto no encontrado'
      });
    }    
    const updateCart = await carts.addProductToCart(cid, productDetails);
    res.send({
      status: "success",
      payload: updateCart
    });
  } catch (error) {
    res.status(400).send({ 
      status: 'error', 
      error: error.message 
    });
  }
});

cartsRouter.delete("/:cid", async (req, res) => {
  const cartId = req.params.cid;
  try {
    await carts.deleteCart(cartId);
    res.send("Carrito eliminado")
  } catch (error) {
    return res.status(400).send({status:'error', error: error.message})
  }
})

export default cartsRouter;