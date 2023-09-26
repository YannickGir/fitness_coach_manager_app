"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./config/database"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const db = (0, database_1.default)();
app.get("/user_table", (req, res) => {
    const q = "SELECT * FROM fitness_coach_manager_app.user_table;";
    db.query(q, (err, data) => {
        if (err)
            return res.json(err);
        return res.json(data);
    });
});
app.use(express_1.default.json()); //to send datas from client in json form
app.use((0, cors_1.default)());
app.get("/", (req, res) => {
    res.json("hello this is the backend !!");
});
app.listen(8800, () => console.log("connected to the server !"));
