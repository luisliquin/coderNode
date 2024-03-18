import { Router } from "express";
import { ProductManager } from "../service/ProductManager.js";

const router = Router();
const products = new ProductManager("./src/data/products.json");

router.get("/", async (req, res) => {
    try {
        const productList = await products.getProducts();
        console.log('productList', productList)
        res.render(
            "productList",
            {
                title: "Listado productos",
                style: "index.css",
                productList
            });
    } catch (error) {
        res.status(500).send(error.message);
    }    
});

export default router;