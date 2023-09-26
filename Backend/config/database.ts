
import path from "path";
import mysql, { Connection } from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const createDatabaseConnection = (): Connection => {
  const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.PASSWORDDB,
    database: "fitness_coach_manager_app",
  });

  return db;
};

export default createDatabaseConnection;
