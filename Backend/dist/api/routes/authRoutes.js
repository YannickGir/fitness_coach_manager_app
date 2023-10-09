"use strict";
//authRoutes
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
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.get("/user_table", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, authController_1.getUsers)(req, res);
}));
router.post('/authenticate', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, authController_1.loginUser)(req, res, next);
        return res.status(200).json("connexion réussie !");
    }
    catch (error) {
        console.error(error);
        res.json({ message: 'Erreur lors de l\'authentification' });
    }
}));
router.post('/signUp', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, authController_1.SignUpUser)(req, res);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de l\'inscription' });
    }
}));
router.post('/logout', authMiddleware_1.verifyToken, (req, res) => {
    // Détruire la session
    req.session.destroy((err) => {
        if (err) {
            console.error('Erreur lors de la déconnexion :', err);
            return res.status(500).json({ message: 'Erreur lors de la déconnexion' });
        }
        // Effacer le cookie de session
        res.clearCookie('jwtToken', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        res.status(200).json({ message: 'Déconnexion réussie' });
    });
});
module.exports = router;
