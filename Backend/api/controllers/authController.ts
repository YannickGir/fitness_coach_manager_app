
//authController

import { Request, Response } from 'express';
import createDatabaseConnection from '../../config/database';
const db = createDatabaseConnection();
import { ParsedQs } from 'qs';
import { generateToken, verifyToken} from "../middleware/authMiddleware";


import bcrypt from 'bcrypt';
const saltRounds = 10;

export const getUsers = async(req: Request, res: Response)=> {
    const q = "SELECT * FROM fitness_coach_manager_app.user_table;"
    db.query(q, (err: Error, data: String)=>{
        if(err) return res.json(err)
        return res.json (data)
    })
}

export const loginUser = async (req: Request, res: Response, next: (() => void)) => {
    const { username, password_hash, email, role } = req.body;
    const q = "SELECT * FROM user_table WHERE (username = ? OR email = ?)";
    db.query(q, [username, email], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur de serveur lors de l'authentification." });
        return 
      }
  
      if (Array.isArray(results) && results.length > 0) {
        const user = results[0] as {
            role: any; password_hash: string 
};
  
        bcrypt.compare(password_hash, user.password_hash, function(err:Error|undefined, result:Boolean) {
          if (err) {
            console.error(err);
            res.status(500).json({ message: "Erreur de serveur lors de l'authentification." });
            return 
          }
  
          if (result === true) {
           
            const userData = {
                email: email,
                username: username,
                role:user.role
              };
              console.log("userData.role:" + userData.role)
              generateToken(req, res, userData, () => {
                });
                const token = req.myToken;
                res.status(200).json({ message: "Login successful", token, userData});
              return; 
          } else {
            return res.status(401).json({ message: "L'authentification a échoué. Vérifiez vos informations d'identification." });
          }
        });
      } else {
        res.status(401).json({ message: "L'authentification a échoué. Vérifiez vos informations d'identification." });
      return }
    });
  };


  export const userAuthenticated = async(req:Request, res:Response)=>{
    const cookie = req.cookies["jwtToken"]
    res.send(cookie)
  }

export const SignUpUser = async(req:Request, res:Response)=>{
    bcrypt.genSalt(saltRounds, function(err: Error | undefined, salt: string) {
        if (err) 
            {
            console.error(err);
            return res.status(500).json({ message: "Erreur lors de l'inscription salt." });
            }
        const myPlaintextPassword = req.body.password_hash;
        bcrypt.hash(myPlaintextPassword, salt, function(err: Error | undefined, hashedPassword: string) 
        {
            if (err) 
            {
                console.error(err);
                return res.status(500).json({ message: "Erreur lors de l'inscription hash." });
            }
            const values = 
            [
                req.body.username,
                req.body.email,
                hashedPassword,
                req.body.created_at,
                req.body.role,
            ]
            const sql = "SELECT COUNT(*) AS count FROM user_table WHERE email = ?";
            db.query(sql, [values[1]], (error, results:any)=> {
                const count = results[0].count;
                const emailExists = count === 1;
                if (emailExists) 
                {
                    console.log ("email Exists")
                }
                else 
                {
                    const q = "INSERT INTO user_table (`username`,`email`,`password_hash`,`created_at`,`role`) VALUES (?)"
                    db.query(q, [values], (err, data) => {
                        if (err) 
                        {
                            console.error(err);
                            return res.status(500).json({ message: "Erreur lors de l'inscription INSERT INTO." });
                        }
                        return res.status(200).json({ message: "L'utilisateur a été créé avec succès !" });
                    });
                }
            })
        });
    });

    
};

    export const logoutMiddleware = async(req: Request, res: Response)=> {
        const token = req.myToken;
         res.clearCookie('jwtToken');
        res.status(200).json({ message: 'Déconnexion réussie' });
    }

    export const accesstoDashboard = async(req:Request, res:Response)=>{
        const token = req.myToken;
        verifyToken(req, res, (user) => { console.log(user.role)
            
            if (user && user.role === 'coach') {
              
              res.status(200).json({ message: "Accès autorisé à la page Dashboard du coach" });
            } else {
             
              res.status(403).json({ message: "Accès refusé. Vous devez être un coach pour accéder à cette page." });
            }
          });
      }

      export const accesstoDashboardClient = async(req:Request, res:Response)=>{
        const token = req.myToken;
        verifyToken(req, res, (user) => { console.log(user.role)
            
            if (user && user.role === 'client') {
              
              res.status(200).json({ message: "Accès autorisé à la page Dashboard du client" });
            } else {
             
              res.status(403).json({ message: "Accès refusé. Vous devez être un client pour accéder à cette page." });
            }
          });
      }