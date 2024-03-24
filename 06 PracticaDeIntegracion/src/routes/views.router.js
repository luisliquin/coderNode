import { Router } from "express";
import { ProductManager } from "../service/ProductManager.js";

const router = Router();
const products = new ProductManager("./src/data/products.json");

router.get("/", async (req, res) => {
    try {
        const productList = await products.getProducts();
        res.render(
            "home",
            {
                title: "Home",
                style: "home.css",
                productList
            });
    } catch (error) {
        res.status(500).send({error: "Error interno del servidor"});
    }    
});

router.get("/realtimeproducts", async (req, res) => {
    try {
        const productList = await products.getProducts();
        res.render("realtimeproducts",
        {
            title: "Real Time Products",
            style: "realtimeproducts.css",
            productList
        }
        );
    } catch (error) {
        res.status(500).send(error.message);
    }    
});


export default router;