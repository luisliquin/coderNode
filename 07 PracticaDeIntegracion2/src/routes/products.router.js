import { Router } from "express";
//import { ProductManager } from "../dao/ProductManagerFS.js";
import ProductManagerDB from "../dao/ProductManagerDB.js";

const productRouter = Router();
//const products = new ProductManager("./src/data/products.json");
const products = new ProductManagerDB();

productRouter.get(`/`, async (req, res) => {
    try {
        const limit = parseInt(req.query.limit, 10) || 10;
        const productList = await products.getProducts();
        res.json(limit ? productList.slice(0, Number(limit)) : productList);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

productRouter.get(`/:id`, async (req, res) => {
    try {
        const id  = req.params.id;
        console.log("productId", id)
        const product = await products.getProductByID(id);
        if (product) {
            res.json(product);            
        }else{
            res.status(404).send({error: "Producto no encontrado"});
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

productRouter.delete(`/:id`, async (req, res) => {
    const id = req.params.id;
    try {
        await products.deleteProduct(id);
        res.send({status: "success", message: "producto eliminado " + id});
    } catch (error) {
        res.status(404).send({status:"error", error: "Ha ocurrido un error" });
    }
});

productRouter.post(`/`, async (req, res) => {
    const { title, description, price, code, stock } = req.body;  

    if (!title || !description || price === undefined || !code || stock === undefined) {
        return res.status(400).send({status: 'Error', error: "Todos los campos son obligatorios excepto thumbnails" });
    }

    const status = req.body.status !== undefined ? req.body.status : true; 
    const thumbnails = req.body.thumbnails !== undefined ? req.body.thumbnails : []; 

    try {
        await products.addProduct({ title, description, price, code, stock, thumbnails, status });
        res.status(201).send({status: "success", message: "producto agregado"});
    } catch (error) {
        console.log(`Error de post ${error}`);
        res.status(400).send({ status: 'Error', error: error.message });
    }
});

productRouter.put(`/:id`, async (req, res) => {
    const id = req.params.id;
    try {
        const updateProduct = await products.updateProduct(id, req.body);
        res.json(updateProduct);
    } catch (error) {
        if (error.message === "Producto no encontrado.") {
            res.status(404).send({ error: error.message });
        } else {
            res.status(500).send({ error: error.message });
        }
    }
});

export default productRouter;