"use strict";
//authMiddleware
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.JWT_SECRET || "";
const generateToken = (req, res, userData, next) => {
    const MAX_AGE = 60 * 60 * 24 * 30;
    const token = jwt.sign({
        username: userData.username,
        email: userData.email,
        role: userData.role
    }, secret, {
        expiresIn: MAX_AGE
    });
    //console.log("Token généré:", token);
    req.myToken = token;
    next();
    if (!secret) {
        console.error('La variable d\'environnement JWT_SECRET n\'est pas définie.');
        process.exit(1);
    }
};
exports.generateToken = generateToken;
const verifyToken = (req, res, next) => {
    console.log("req.cookies.jwtToken: " + req.cookies.jwtToken);
    const token = req.cookies.jwtToken;
    if (!token) {
        return res.status(401).json({ message: 'Token missing' });
    }
    try {
        const decoded = jwt.verify(token, secret);
        req.decodedToken = decoded;
        console.log("decoded: " + JSON.stringify(decoded, null, 2));
        next(decoded);
    }
    catch (error) {
        return res.status(401).json({ message: 'Token invalid' });
    }
};
exports.verifyToken = verifyToken;
