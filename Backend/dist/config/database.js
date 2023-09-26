"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const createDatabaseConnection = () => {
    const db = mysql2_1.default.createConnection({
        host: "localhost",
        user: "root",
        password: process.env.PASSWORDDB,
        database: "fitness_coach_manager_app",
    });
    return db;
};
exports.default = createDatabaseConnection;
