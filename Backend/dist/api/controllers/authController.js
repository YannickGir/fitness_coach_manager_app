"use strict";
//authController
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
exports.SignUpUser = exports.userAuthenticated = exports.loginUser = exports.getUsers = void 0;
const database_1 = __importDefault(require("../../config/database"));
const db = (0, database_1.default)();
const authMiddleware_1 = require("../middleware/authMiddleware");
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
//J'AI INITIALISE JWT UNIQUEMENT DANS LIGINUSER POUR LE MOMENT, LE FAIRE ENSUITE DANS SINGUP APRES VERIFICATION QUE CA MARCHE
//ET AJOUTER UNE VERIFICATION DE TOKEN AUSSI (CREER MIDDLEWARE ET L'AJOUTER ICI A LOGINUSER)
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password_hash, email } = req.body;
    const q = "SELECT * FROM user_table WHERE (username = ? OR email = ?)";
    db.query(q, [username, email], (err, results, fields) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: "Erreur de serveur lors de l'authentification." });
            return;
        }
        if (Array.isArray(results) && results.length > 0) {
            const user = results[0];
            bcrypt_1.default.compare(password_hash, user.password_hash, function (err, result) {
                if (err) {
                    console.error(err);
                    res.status(500).json({ message: "Erreur de serveur lors de l'authentification." });
                    return;
                }
                if (result === true) {
                    const userData = {
                        email: email,
                        username: username,
                    };
                    (0, authMiddleware_1.generateAndStoreToken)(req, res, userData, () => {
                    });
                    const token = req.myToken;
                    console.log("token in authController :" + token);
                    // res.cookie('jwtToken', token, {
                    //     httpOnly: true, 
                    //     maxAge: 3600000, 
                    //     path: '/',
                    //   });
                    //   console.log("Cookie jwtToken défini:", req.cookies.jwtToken);
                    res.status(200).json({ message: "Login successful", token });
                    return;
                }
                else {
                    return res.status(401).json({ message: "L'authentification a échoué. Vérifiez vos informations d'identification." });
                }
            });
        }
        else {
            res.status(401).json({ message: "L'authentification a échoué. Vérifiez vos informations d'identification." });
            return;
        }
    });
});
exports.loginUser = loginUser;
const userAuthenticated = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cookie = req.cookies["jwtToken"];
    res.send(cookie);
});
exports.userAuthenticated = userAuthenticated;
const SignUpUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    bcrypt_1.default.genSalt(saltRounds, function (err, salt) {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Erreur lors de l'inscription salt." });
        }
        const myPlaintextPassword = req.body.password_hash;
        bcrypt_1.default.hash(myPlaintextPassword, salt, function (err, hashedPassword) {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Erreur lors de l'inscription hash." });
            }
            const values = [
                req.body.username,
                req.body.email,
                hashedPassword,
                req.body.created_at,
            ];
            const sql = "SELECT COUNT(*) AS count FROM user_table WHERE email = ?";
            db.query(sql, [values[1]], (error, results) => {
                const count = results[0].count;
                const emailExists = count === 1;
                if (emailExists) {
                    console.log("email Exists");
                }
                else {
                    const q = "INSERT INTO user_table (`username`,`email`,`password_hash`,`created_at`) VALUES (?)";
                    db.query(q, [values], (err, data) => {
                        if (err) {
                            console.error(err);
                            return res.status(500).json({ message: "Erreur lors de l'inscription INSERT INTO." });
                        }
                        return res.status(200).json({ message: "L'utilisateur a été créé avec succès !" });
                    });
                }
            });
        });
    });
});
exports.SignUpUser = SignUpUser;
