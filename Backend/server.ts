
import express from "express"
import cors from "cors"
import dotenv from "dotenv";
import { Request, Response } from 'express';
import createDatabaseConnection  from './config/database';
import mysql from "mysql2"

dotenv.config();

const app = express()
const db = createDatabaseConnection();

app.get("/user_table", (req: Request, res: Response)=> {
    const q = "SELECT * FROM fitness_coach_manager_app.user_table;"
    db.query(q, (err: Error, data: String)=>{
        if(err) return res.json(err)
        return res.json (data)
    })
})

app.use(express.json());  //to send datas from client in json form
app.use(cors());
app.get("/", (req, res) => {
    res.json("hello this is the backend !!")
})

app.listen(8800, ()=>
console.log("connected to the server !")
)
