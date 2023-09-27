import { Request, Response } from 'express';
import createDatabaseConnection from '../../config/database';
const db = createDatabaseConnection();
import { ParsedQs } from 'qs';



const bcrypt = require('bcrypt');
const saltRounds = 10;

export const loginUser = async (req: Request, res: Response) => {
    const { username, password_hash, email } = req.body;

    const q = "SELECT * FROM user_table WHERE (username = ? OR email = ?)";
    db.query(q, [username, email], (err, results, fields) => {
      if (err) {
        // Une erreur s'est produite lors de l'exécution de la requête
        console.error(err);
        return res.status(500).json({ message: "Erreur de serveur lors de l'authentification." });
      }
  
      if (Array.isArray(results) && results.length > 0) {
        const user = results[0] as { password_hash: string };
  
        // Comparez le mot de passe fourni avec celui stocké en base de données
        bcrypt.compare(password_hash, user.password_hash, function(err:Error, result:Boolean) {
          if (err) {
            // Une erreur s'est produite lors de la comparaison
            console.error(err);
            return res.status(500).json({ message: "Erreur de serveur lors de l'authentification." });
          }
  
          if (result === true) {
            // Mot de passe correct : l'utilisateur est authentifié avec succès
            return res.status(200).json({ message: "L'authentification a réussi !" });
          } else {
            // Mot de passe incorrect
            return res.status(401).json({ message: "L'authentification a échoué. Vérifiez vos informations d'identification." });
          }
        });
      } else {
        // Aucun utilisateur correspondant n'a été trouvé
        return res.status(401).json({ message: "L'authentification a échoué. Vérifiez vos informations d'identification." });
      }
    });
  };
