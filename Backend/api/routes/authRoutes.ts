
import express from 'express';
import { loginUser, getUsers, SignUpUser } from '../controllers/authController';
import { Request, Response } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

const router = express.Router();


router.get("/user_table", async (req: Request, res: Response)=> {
    const result = await getUsers(req, res);
})

router.post('/authenticate', async (req, res) => {
    try {
      const result = await loginUser(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de l\'authentification' });
    }
  });

  router.post('/signUp', async (req, res)=>{
    try {
        const result = await SignUpUser(req, res);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({message: 'Erreur lors de l\'inscription'});
    }
  })

  router.post('/logout', (req, res) => {
    // Détruire la session
    req.session.destroy((err) => {
      if (err) {
        console.error('Erreur lors de la déconnexion :', err);
        return res.status(500).json({ message: 'Erreur lors de la déconnexion' });
      }
      
      // Effacer le cookie de session
      res.clearCookie('connect.sid');
  
      res.status(200).json({ message: 'Déconnexion réussie' });
    });
  });
  
  module.exports = router;
  

