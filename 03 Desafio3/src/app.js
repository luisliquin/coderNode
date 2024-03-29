import express from 'express';
import { ProductManager } from './Service/ProductManager.js';

const products = new ProductManager('./src/Data/products.json') ;
const app = express(); 
const port = 8080;

app.use(express.urlencoded({extended: true}));

//obtengo desde la app el listado
app.get('/products', async (req, res) => {
    try {
        const { limit } = req.query;
        const productList = await products.getProducts();
        res.json(limit ? productList.slice(0, Number(limit)) : productList);        
    }catch(error){
        res.status(500).send(error.message);
    }
});

//obtendo solamente por id del producto
app.get('/products/:id', async (req, res) => {
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

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});