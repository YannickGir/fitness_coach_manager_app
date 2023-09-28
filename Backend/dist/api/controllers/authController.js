"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.getUsers = void 0;
const database_1 = __importDefault(require("../../config/database"));
const db = (0, database_1.default)();
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = 10;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const q = "SELECT * FROM fitness_coach_manager_app.user_table;";
    db.query(q, (err, data) => {
        if (err)
            return res.json(err);
        return res.json(data);
    });
});
exports.getUsers = getUsers;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password_hash, email } = req.body;
    const q = "SELECT * FROM user_table WHERE (username = ? OR email = ?)";
    db.query(q, [username, email], (err, results, fields) => {
        if (err) {
            // Une erreur s'est produite lors de l'exécution de la requête
            console.error(err);
            return res.status(500).json({ message: "Erreur de serveur lors de l'authentification." });
        }
        if (Array.isArray(results) && results.length > 0) {
            const user = results[0];
            // Comparez le mot de passe fourni avec celui stocké en base de données
            bcrypt_1.default.compare(password_hash, user.password_hash, function (err, result) {
                if (err) {
                    // Une erreur s'est produite lors de la comparaison
                    console.error(err);
                    return res.status(500).json({ message: "Erreur de serveur lors de l'authentification." });
                }
                if (result === true) {
                    // Mot de passe correct : l'utilisateur est authentifié avec succès
                    res.json({ message: "L'authentification a réussi !" });
                }
                else {
                    // Mot de passe incorrect
                    return res.status(401).json({ message: "L'authentification a échoué. Vérifiez vos informations d'identification." });
                }
            });
        }
        else {
            // Aucun utilisateur correspondant n'a été trouvé
            return res.status(401).json({ message: "L'authentification a échoué. Vérifiez vos informations d'identification." });
        }
    });
});
exports.loginUser = loginUser;
