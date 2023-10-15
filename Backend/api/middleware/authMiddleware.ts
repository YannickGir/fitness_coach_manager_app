//authMiddleware


const jwt = require('jsonwebtoken');
import { Request, Response } from 'express';
require('dotenv').config();
const secret = process.env.JWT_SECRET || "";

export const generateToken = (req:Request, res:Response, userData: { email: any; username: any; }, next: (() => void)) => {
 // console.log("UserData:", userData);
  const MAX_AGE : number = 60* 60* 24* 30;
  const token = jwt.sign(
        {
            username:userData.username,
            email:userData.email
        },
        secret, 
        {
        expiresIn : MAX_AGE
        }
    );
    //console.log("Token généré:", token);
    req.myToken = token;
    next();
    
    if (!secret) {
        console.error('La variable d\'environnement JWT_SECRET n\'est pas définie.');
        process.exit(1);
    }
}
    
export const verifyToken = (req: Request, res: Response, next: (() => void)) => {
    console.log("req.cookies.jwtToken: " + req.cookies.jwtToken)
    const token = req.cookies.jwtToken; 
    if (!token) {
        return res.status(401).json({ message: 'Token missing' });
    }
    try {
        const decoded = jwt.verify(token, secret);
        (req as any).decodedToken = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token invalid' });
    }
};



