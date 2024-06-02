import {Router} from 'express';
import passport from 'passport';
import UserModel from '../dao/models/UserModel.js';
import {createHash, isValidPassword} from '../utils/functionsUtils.js';
import jwt from 'jsonwebtoken';

const userRouter = Router();

const generateToken = (user) => {
    return jwt.sign({ sub: user._id }, "12b0086d09825e1bf3b8ee6d386c80f576494b52", { expiresIn: '1h' });
};

userRouter.post("/register", async (req, res) => {
    try {
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
        res.redirect("/register");
    }
});

userRouter.post("/login", async (req, res, next) => {
    try {
        req.session.failLogin = false;
        const user = await UserModel.findOne({email: req.body.email}).lean();
        console.log("Se estan comparando >>>>>>", user.password, req.body.password);
        if (!user || !isValidPassword(user, req.body.password)) {
            req.session.failLogin = true;
            return res.redirect("/login");
        }        
        const token = generateToken();
        res.cookie('token', token, {httpOnly: true})
        delete user.password;
        return res.redirect("/home");
    } catch (e) {
        console.error("Error en el proceso de login", e)
        req.session.failLogin = true;
        return res.redirect("/login");
    }
});

userRouter.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/login'); 
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

userRouter.get(
    "/current",
    passport.authenticate("jwtCookies"),
    async(req, res) => {
      const { userId } = req.user;
      const user = await userDao.getById(userId);
      if (!user) res.send("Not found");
      else {
        const { first_name, last_name, email, role } = user;
        res.json({
          status: "success",
          userData: {
            first_name,
            last_name,
            email,
            role,
          },
        });
      }
    }
  );
  

export default userRouter;