//server.ts


import express from "express"
import cors from "cors"
import dotenv from "dotenv";
import createDatabaseConnection  from './config/database';
import session from 'express-session';
const authRoute = require('./api/routes/authRoutes'); 
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');


dotenv.config();

const app = express()
const db = createDatabaseConnection();
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Si vous utilisez des cookies ou des informations d'authentification.
  };
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(session({
    secret: 'votre_secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // Si l'application utilise HTTPS, définir ceci sur true
      maxAge: 3600000, // Durée de validité du cookie en millisecondes
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
app.use(cors({
    credentials : true,
    origin: ['http://localhost:3000', 'http://localhost:8800']
}));
app.get("/", (req, res) => {
    res.json("hello this is the backend !!")
})

app.listen(8800, ()=>
console.log("connected to the server !")
)

