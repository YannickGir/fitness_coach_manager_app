
import express from 'express';
import { loginUser, getUsers } from '../controllers/authController';
import { Request, Response } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

const router = express.Router();

router.get("/user_table", async (req: Request, res: Response)=> {
    const result = await getUsers(req, res);
})

router.post('/authenticate', async (req, res) => {
    try {
      // Vous pouvez appeler la méthode loginUser de authController ici
      const result = await loginUser(req, res);
      
      // Utilisez le résultat de la méthode loginUser ici
      res.status(200).json(result);
    } catch (error) {
      // Gérez les erreurs ici
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de l\'authentification' });
    }
  });
  
  module.exports = router;
  

