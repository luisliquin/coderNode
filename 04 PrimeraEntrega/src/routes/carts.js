import express from "express";
import { CartManager } from "../service/CartManager.js";

const router = express.Router();
const carts = new CartManager("./src/data/carts.json");

//Controller para todos los carrito
router.get(`/carts`, async (req, res) => {
  try {
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//Controller de busqueda por Id
router.get(`/carts/:id`, async (req, res) =>{
  try { 
  } catch (error) {
    res.status(404).send({ error: "producto no existe" });
  }
});

//Controller para agregar un carrito
router.post(`/carts`, async (req, res) => {
  let cart = req.body;
});

//Controller para actualizar un carrito
router.put(`/carts/:id`, async (req, res) => {});

//Controller para eliminar un carrito
router.delete(`/carts/:id`, async (req, res) => {});

export default router;
