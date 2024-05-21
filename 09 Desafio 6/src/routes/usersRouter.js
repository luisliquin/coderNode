import {Router} from 'express';
import passport from 'passport';
import UserModel from '../dao/models/UserModel.js';
import {createHash, isValidPassword} from '../utils/functionsUtils.js';

const userRouter = Router();

userRouter.post("/register", async (req, res) => {
    try {
        req.session.failRegister = false;

        if (!req.body.email || !req.body.password) throw new Error("Register error!");

        const newUser = {
            first_name: req.body.first_name ?? "",
            last_name: req.body.last_name ?? "",
            email: req.body.email,
            age: req.body.age ?? "",
            password: createHash(req.body.password)
        }
        await UserModel.create(newUser);
        res.redirect("/login");
    } catch (e) {
        console.log(e.message);
        req.session.failRegister = true;
        res.redirect("/register");
    }
});

userRouter.post("/login", async (req, res) => {
    try {
        req.session.failLogin = false;
        const user = await UserModel.findOne({email: req.body.email}).lean();
        if (!user) {
            req.session.failLogin = true;
            return res.redirect("/login");
        }

        console.log("Se estan comparando >>>>>>", user.password, req.body.password);
        if (!isValidPassword(user, req.body.password)) {
            req.session.failLogin = true;
            return res.redirect("/login");
        }

        delete user.password;
        
        return res.redirect("/home");
    } catch (e) {
        console.error("Error en el proceso de login", e)
        req.session.failLogin = true;
        return res.redirect("/login");
    }
});

userRouter.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error("Error al cerrar la sesión: ", err);
            return res.status(500).send("No se pudo cerrar la sesión correctamente.");
        }
        res.redirect('/login'); 
    });
});

userRouter.get('/github', passport.authenticate('github', {scope: ['user:email']}), (req, res) => {
    res.send({
        status: 'success',
        message: 'Success'
    });
});

userRouter.get('/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/home');
    }
);

export default userRouter;