
import express from "express"
import cors from "cors"
import dotenv from "dotenv";
import { Request, Response } from 'express';
import createDatabaseConnection  from './config/database';
import mysql from "mysql2"
import session from 'express-session';
const authRoute = require('./api/routes/authRoutes'); 

const bodyParser = require('body-parser');


dotenv.config();

const app = express()
const db = createDatabaseConnection();

app.use(session({
    secret: 'votre_secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // Si votre application utilise HTTPS, vous pouvez définir ceci sur true
      maxAge: 3600000, // Durée de validité du cookie en millisecondes (ici, 1 heure)
    },
  }));

app.use(cors({ origin: 'http://localhost:3000' }));

import bcrypt from 'bcrypt';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/CustomPopup', (req, res) => {
   //revoit vers une page etc... ici
    const errorMessage = req.query.message || 'Erreur inconnue';
    res.status(404).json({ message: errorMessage });
  });

app.use('/api', authRoute)

app.use(express.json());  //to send datas from client in json form
app.use(cors());
app.get("/", (req, res) => {
    res.json("hello this is the backend !!")
})

app.listen(8800, ()=>
console.log("connected to the server !")
)

