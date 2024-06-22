import bcrypt from "bcrypt";

export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

export const createResponse = (res, statusCode, data) => { return res.status(statusCode).json({ data }); };