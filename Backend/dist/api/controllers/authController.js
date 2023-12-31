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
exports.accesstoDashboardClient = exports.accesstoDashboard = exports.logoutMiddleware = exports.SignUpUser = exports.userAuthenticated = exports.loginUser = exports.getUsers = void 0;
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
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password_hash, email, role } = req.body;
    const q = "SELECT * FROM user_table WHERE (username = ? OR email = ?)";
    db.query(q, [username, email], (err, results) => {
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
                        role: user.role
                    };
                    console.log("userData.role:" + userData.role);
                    (0, authMiddleware_1.generateToken)(req, res, userData, () => {
                    });
                    const token = req.myToken;
                    res.status(200).json({ message: "Login successful", token, userData });
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
                req.body.role,
            ];
            const sql = "SELECT COUNT(*) AS count FROM user_table WHERE email = ?";
            db.query(sql, [values[1]], (error, results) => {
                const count = results[0].count;
                const emailExists = count === 1;
                if (emailExists) {
                    console.log("email Exists");
                }
                else {
                    const q = "INSERT INTO user_table (`username`,`email`,`password_hash`,`created_at`,`role`) VALUES (?)";
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
const logoutMiddleware = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.myToken;
    res.clearCookie('jwtToken');
    res.status(200).json({ message: 'Déconnexion réussie' });
});
exports.logoutMiddleware = logoutMiddleware;
const accesstoDashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.myToken;
    (0, authMiddleware_1.verifyToken)(req, res, (user) => {
        console.log(user.role);
        if (user && user.role === 'coach') {
            res.status(200).json({ message: "Accès autorisé à la page Dashboard du coach" });
        }
        else {
            res.status(403).json({ message: "Accès refusé. Vous devez être un coach pour accéder à cette page." });
        }
    });
});
exports.accesstoDashboard = accesstoDashboard;
const accesstoDashboardClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.myToken;
    (0, authMiddleware_1.verifyToken)(req, res, (user) => {
        console.log(user.role);
        if (user && user.role === 'client') {
            res.status(200).json({ message: "Accès autorisé à la page Dashboard du client" });
        }
        else {
            res.status(403).json({ message: "Accès refusé. Vous devez être un client pour accéder à cette page." });
        }
    });
});
exports.accesstoDashboardClient = accesstoDashboardClient;
