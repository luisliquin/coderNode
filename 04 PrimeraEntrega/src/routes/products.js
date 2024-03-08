import express from 'express';
import { ProductManager } from '../service/ProductManager.js'; 

const router = express.Router();
const products = new ProductManager('./src/data/products.json');

//Controller para todos los productos
router.get(`/products`, async (req, res) => {
    try {
        const { limit } = req.query;
        const productList = await products.getProducts();
        res.json(limit ? productList.slice(0, Number(limit)) : productList);        
    }catch(error){
        res.status(500).send(error.message);
    }
});

//Controller de busqueda por Id
router.get(`/products/:id`, async (req, res) => {
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
router.post(`/products`, async (req, res) => {
    let product = req.body;

})

//Controller para actualizar un producto
router.put(`/products/:id`, async (req, res) => {

})

//Controller para eliminar un producto
router.delete(`/products/:id`, async (req, res) => {

})

export default router;