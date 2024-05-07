import productsRouter from '../routes/productsRouter.js';
import cartsRouter from '../routes/cartsRouter.js';
import viewsRouter from '../routes/viewsRouter.js';
import coockieParser from "cookie-parser"
import cookiesRouter from "../routes/cookiesRouter.js";
import session from 'express-session';
import mongoose from 'mongoose';
import mongoStore from 'connect-mongo';
import userRouter from '../routes/usersRouter.js';

const setupRoutes = (app) => {
    const uri = "mongodb+srv://luisliquin:5VdRQt7U9jhvswU4@cluster0.e7prtgh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    const options = {dbName: "ecommerce"};
    mongoose.connect(uri, options);

    app.use(session(
        {
            store: mongoStore.create(
                {
                    mongoUrl: uri,
                    ttl: 1200
                }
            ),
            secret: 'secretPhrase',
            resave: false,
            saveUninitialized: false,
            cookie: { secure: false }
        }
    ))
    app.use(coockieParser("CoderPass2024"));
    app.use("/", viewsRouter);
    app.use("/api/products", productsRouter);
    app.use("/api/carts", cartsRouter);
    app.use("cookies", cookiesRouter);
    app.use("/api/sessions", userRouter);
};

export default setupRoutes;