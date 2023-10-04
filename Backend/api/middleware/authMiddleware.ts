
import jwt from 'jsonwebtoken';
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
    console.error('La variable d\'environnement JWT_SECRET n\'est pas définie.');
    process.exit(1);
  }
export const generateToken = (userId: string) => {
  const secretKey  = jwtSecret; // Remplacez par une clé secrète sécurisée
  const token = jwt.sign({ userId }, secretKey, { expiresIn: '3h' });
  return token;
};

module.exports = {
  generateToken,
};
