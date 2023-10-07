
const jwt = require('jsonwebtoken');
import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
export const generateAndStoreToken = (req:Request, res:Response, userData: { email: any; username: any; }, next: (() => void)) => {

  const user = { username: userData.username, email: userData.email };
  const secret = process.env.JWT_SECRET || "";
  const MAX_AGE : number = 60* 60* 24* 30;
//   const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
  
  const token = sign(
    {
        username:userData.username,
        email:userData.email
    },
        secret, 
        {
           expiresIn : MAX_AGE
        }
    );
  res.cookie('jwtToken', token, {
    httpOnly: true, // cookie accessible uniquement côté serveur
    secure: process.env.NODE_ENV === 'production', // HTTPS en production
    maxAge: 3600000, // Durée de validité du token (1 heure)
  });

  next(); //étape suivante de la chaîne middleware
}







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