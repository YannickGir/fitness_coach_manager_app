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
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const router = express_1.default.Router();
router.get("/user_table", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, authController_1.getUsers)(req, res);
}));
router.post('/authenticate', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Vous pouvez appeler la méthode loginUser de authController ici
        const result = yield (0, authController_1.loginUser)(req, res);
        // Utilisez le résultat de la méthode loginUser ici
        res.status(200).json(result);
    }
    catch (error) {
        // Gérez les erreurs ici
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de l\'authentification' });
    }
}));
module.exports = router;