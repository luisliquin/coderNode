import productsRouter from '../routes/products.router.js';
import cartsRouter from '../routes/carts.router.js';
import viewsRouter from '../routes/views.router.js';
import coockieParser from "cookie-parser"
import cookiesRouter from "../routes/cookiesRouter.js";
import session from 'express-session';
import sessionRouter from "../routes/sessionRouter.js";

const setupRoutes = (app) => {
    app.use("/", viewsRouter);
    app.use("/api/products", productsRouter);
    app.use("/api/carts", cartsRouter);
    app.use(coockieParser("CoderPass2024"));
    app.use("cookies", cookiesRouter);
    app.use(session(
        {
            secret: "secretPhrase",
            resave: true,
            saveUninitialized: true
        }
    ))
    app.use("session", sessionRouter);
};

export default setupRoutes;