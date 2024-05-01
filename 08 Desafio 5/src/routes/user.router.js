import {Router} from 'express';

import userModel from '../models/userModel.js';
import {createHash, isValidPassword} from '../utils/functionsUtils.js';

const router = Router();

router.post("/register", async (req, res) => {
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
        await userModel.create(newUser);
        res.redirect("/login");
    } catch (e) {
        console.log(e.message);
        req.session.failRegister = true;
        res.redirect("/register");
    }
});

router.post("/login", async (req, res) => {
    try {
        req.session.failLogin = false;
        const result = await userModel.findOne({email: req.body.email}).lean();
        if (!result) {
            req.session.failLogin = true;
            return res.redirect("/login");
        }

        console.log("Se estan comparando >>>>>>", result.password, req.body.password);
        if (!isValidPassword(result, req.body.password)) {
            req.session.failLogin = true;
            return res.redirect("/login");
        }

        delete result.password;
        req.session.user = result;

        return res.redirect("/");
    } catch (e) {
        req.session.failLogin = true;
        return res.redirect("/login");
    }
});

export default router;