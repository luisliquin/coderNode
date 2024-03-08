import express from 'express';
import { ProductManager } from '../service/ProductManager.js'; 

const router = express.Router();
const products = new ProductManager('./src/data/products.json');

//Controller para todos los productos
router.get(`/`, async (req, res) => {
    try {
        const { limit } = req.query;
        const productList = await products.getProducts();
        res.json(limit ? productList.slice(0, Number(limit)) : productList);        
    }catch(error){
        res.status(500).send(error.message);
    }
});

//Controller de busqueda por Id
router.get(`/:id`, async (req, res) => {
    try {
        const { id } = req.params;
        const product = await products.getProductById(id);
        if (product){
            res.json(product);
        }
    } catch (error) {
        res.status(404).send({error: "producto no existe"});
    }
});

//Controller para agregar un producto
router.post(`/`, async (req, res) => {
    try{
        const newProduct = await products.addProduct(req.body);
        res.status(201).json(newProduct);
    }catch{
        res.status(500).send({error:error.message});
    }
})

//Controller para actualizar un producto
router.put(`/:id`, async (req, res) => {
    const { id } = req.params;
    try {
        const updatedProduct = await products.updateProduct(Number(id), req.body);
        res.json(updatedProduct);
    } catch (error) {
        if (error.message === "Producto no encontrado.") {
            res.status(404).send({error: error.message});
        } else {
            res.status(500).send({error: error.message});
        }
    }
})

//Controller para eliminar un producto
router.delete(`/:id`, async (req, res) => {
    const { id } = req.params;
    try {
        await products.deleteProduct(Number(id));
        res.status(204).send();
    } catch (error) {
        res.status(404).send({error: "Producto no encontrado."});
    }
})

export default router;