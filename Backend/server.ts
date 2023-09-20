import express from "express"
import mysql, { OkPacket, RowDataPacket } from "mysql2"
import cors from "cors"
import dotenv from "dotenv";
import { Request, Response } from 'express';

dotenv.config();

const app = express()


app.use(express.json());  //to send datas from client in json form
app.use(cors());
app.get("/", (req, res) => {
    res.json("hello this is the backend !!")
})

app.listen(8800, ()=>
console.log("connected to the server !")
)
