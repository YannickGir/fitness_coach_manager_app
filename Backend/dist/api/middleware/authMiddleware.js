"use strict";
//authMiddleware
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateAndStoreToken = void 0;
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.JWT_SECRET || "";
const generateAndStoreToken = (req, res, userData, next) => {
    console.log("UserData:", userData);
    const user = { username: userData.username, email: userData.email };
    const MAX_AGE = 60 * 60 * 24 * 30;
    //   const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
    const token = jwt.sign({
        username: userData.username,
        email: userData.email
    }, secret, {
        expiresIn: MAX_AGE
    });
    console.log("Token généré:", token);
    req.myToken = token;
    // res.cookie('userId', 'userData.userId', {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === 'production',
    //     maxAge: 3600000,
    //     path: '/',
    //   });
    //   res.status(200).json({ message: "connexion réussie !", token: token });
    next();
};
exports.generateAndStoreToken = generateAndStoreToken;
if (!secret) {
    console.error('La variable d\'environnement JWT_SECRET n\'est pas définie.');
    process.exit(1);
}
const verifyToken = (req, res, next) => {
    console.log("req.cookies.jwtToken: " + req.cookies.jwtToken);
    const token = req.cookies.jwtToken;
    if (!token) {
        return res.status(401).json({ message: 'Token missing' });
    }
    try {
        const decoded = jwt.verify(token, secret);
        req.decodedToken = decoded;
        return;
    }
    catch (error) {
        return res.status(401).json({ message: 'Token invalid' });
    }
};
exports.verifyToken = verifyToken;
// import jwt, {JwtPayload} from 'jsonwebtoken';
// import { Request,Response } from 'express';
// require('dotenv').config();
// const jwtSecret = process.env.JWT_SECRET;
// if (!jwtSecret) {
//     console.error('La variable d\'environnement JWT_SECRET n\'est pas définie.');
//     process.exit(1);
//   }
// export const generateToken = (userId: string) => {
//   const secretKey  = jwtSecret;
//   const generateToken  = jwt.sign({ userId }, secretKey, { expiresIn: '3h' });
//   return generateToken ;
// };
// export const verifyToken = (req: Request, res: Response, next: ()=> void) => {
//     const token = req.headers.authorization;
//     if (!token) {
//         return res.status(401).json({ message: 'Token missing' });
//       }
//     try {
//       const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
//       (req as any).locals = { userId: decoded.userId };
//         next();
//       return decoded;
//     } catch (error) {
//         return res.status(401).json({ message: 'Token invalid' });
//     }
//   };
// module.exports = {
//   generateToken,verifyToken
// };
