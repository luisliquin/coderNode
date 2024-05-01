import { Router } from "express";
import { auth } from '../middlewares/auth.js';

const sessionRouter = Router();

sessionRouter.get("/", (req, res) => {
    let username = req.session.user ? req.session.user : '';    
    if (req.session.counter) {
        req.session.counter++;
        res.send(`${username} Visitaste el sitio ${req.session.counter} veces.`);
    } else {
        req.session.counter = 1;
        res.send(`Bienvenido ${username}!`);
    }
});

sessionRouter.get("/login", auth, (req, res) => {
    res.send(`Login success ${req.session.user}!`);
});

sessionRouter.get("/logout", (req, res) => {
    req.session.destroy(error => {
        if(!error) return res.send("Logout Success!");        
        res.send({
            status: "Logout ERROR",
            body: error
        });
    })
});

export default sessionRouter;