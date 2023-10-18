
//authRoutes

import express from 'express';
import { loginUser, getUsers, SignUpUser, userAuthenticated,logoutMiddleware,accesstoDashboard, accesstoDashboardClient } from '../controllers/authController';
import { Request, Response } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { verifyToken } from '../middleware/authMiddleware';

const router = express.Router();


router.get("/user_table", async (req: Request, res: Response)=> {
    const result = await getUsers(req, res);
})

router.get("/userAuthenticated", async (req: Request, res: Response)=> {
    const result = await userAuthenticated(req, res);
})

router.post('/authenticate', async (req, res, next) => {
    try {
      const result = await loginUser(req, res, next);
    //   return res.status(200).json("connexion réussie !")
    } catch (error) {
      console.error(error);
      res.json({ message: 'Erreur lors de l\'authentification' });
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

router.post('/logout', logoutMiddleware, (req, res) => {

    req.session.destroy((err) => {
      if (err) {
        console.error('Erreur lors de la déconnexion :', err);
        return res.status(500).json({ message: 'Erreur lors de la déconnexion' });
      }
      
      
      res.clearCookie('jwtToken', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
      res.status(200).json({ message: 'Déconnexion réussie' });
    });
  });

  router.get('/dashboard', accesstoDashboard);
  router.get('/dashboardClient', accesstoDashboardClient);
  
  module.exports = router;
  

