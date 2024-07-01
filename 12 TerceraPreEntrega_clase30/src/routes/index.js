import { Router } from "express";

import productsRouter from '../routes/productsRouter.js';
import userRouter from '../routes/usersRouter.js';
import cartsRouter from '../routes/cartsRouter.js'
import ticketRouter from '../routes/ticketRouter.js'

export default class MainRouter {
  constructor() {
    this.router = Router();
    this.initRoutes();
  }
  
  initRoutes() {
    this.router.use("/products", productsRouter);
    this.router.use("/users", userRouter);
    this.router.use("/carts", cartsRouter);
    this.router.use("/ticket", ticketRouter)
  }

  getRouter() {
    return this.router;
  }
}
