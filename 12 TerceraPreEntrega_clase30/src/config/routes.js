import viewsRouter from '../routes/viewsRouter.js';
import coockieParser from "cookie-parser"
import cookiesRouter from "../routes/cookiesRouter.js";
import session from 'express-session';
import mongoose from 'mongoose';
import mongoStore from 'connect-mongo';
import userRouter from '../routes/usersRouter.js';
import passport from 'passport';
import '../config/passport.js';
import 'dotenv/config'

const setupRoutes = (app) => {
    const uri = process.env.MONGO_URL;
    const dbName = process.env.DB_NAME

    const options = {dbName: dbName};
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

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(coockieParser("CoderPass2024"));

    app.use("/", viewsRouter);
    app.use("/cookies", cookiesRouter);
    app.use("/api/sessions", userRouter);
};

export default setupRoutes;