"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./config/database"));
const express_session_1 = __importDefault(require("express-session"));
const authRoute = require('./api/routes/authRoutes');
const bodyParser = require('body-parser');
dotenv_1.default.config();
const app = (0, express_1.default)();
const db = (0, database_1.default)();
app.use((0, express_session_1.default)({
    secret: 'votre_secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 3600000, // Durée de validité du cookie en millisecondes
    },
}));
app.use((0, cors_1.default)({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/CustomPopup', (req, res) => {
    //revoit vers une page etc... ici
    const errorMessage = req.query.message || 'Erreur inconnue';
    res.status(404).json({ message: errorMessage });
});
app.use('/api', authRoute);
app.use(express_1.default.json()); //to send datas from client in json form
app.use((0, cors_1.default)());
app.get("/", (req, res) => {
    res.json("hello this is the backend !!");
});
app.listen(8800, () => console.log("connected to the server !"));
