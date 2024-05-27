import bcrypt from "bcrypt";
import passport from "passport";
import local from "passport-local";
import { Strategy as GitHubStrategy } from "passport-github2";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import UserModel from "../dao/models/UserModel.js";
import { createHash, isValidPassword } from "../utils/functionsUtils.js";

const LocalStrategy = local.Strategy;

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await UserModel.findOne({ email: username });
      if (!user) return done(null, false, { message: "Usuario no encontrado" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return done(null, false, { message: "Contraseña incorrecta" });
      
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.use(
  "github",
  new GitHubStrategy(
    {
      clientID: "Ov23liRgUG2ddJBIwrz1",
      clientSecret: "12b0086d09825e1bf3b8ee6d386c80f576494b52",
      callbackURL: "http://localhost:3000/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("entre aca github strategy");
      console.log(profile);
      try {
        let user = await UserModel.findOne({ email: profile._json.email });
        if (!user) {
          user = new UserModel({
            first_name: profile.displayName,
            last_name: profile.username,
            email: profile.emails[0].value,
            password: "",
            isGithub: true,
          });
          await user.save();
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "nEDakKhN8m"
};

passport.use(
  'jwt',
  new JwtStrategy(opts, async (jwt_payload, done) => {
  try {
      const user = await UserModel.findById(jwt_payload.sub);
      if (user) {
          return done(null, user);
      } else {
          return done(null, false);
      }
  } catch (err) {
      return done(err);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await UserModel.findById(id);
  return done(null, user);
});
