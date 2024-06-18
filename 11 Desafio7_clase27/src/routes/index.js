import { Router } from "express";

import productsRouter from '../routes/productsRouter.js';
import userRouter from '../routes/usersRouter.js';

export default class MainRouter {
  constructor() {
    this.router = Router();
    this.initRoutes();
  }

  initRoutes() {
    this.router.use("/products", productsRouter);
    this.router.use("/users", userRouter);
  }

  getRouter() {
    return this.router;
  }
}
