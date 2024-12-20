require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const app = express()


// Forma de ler JSON / middlewares
app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(express.json());

// Rotas da API
const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)

// rota inicial / endpoint
app.get('/', (req, res) => {
    res.json({message: 'Oi express!'})
})

// entregar uma porta
const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.8a8ty.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
)
    .then(() => {
        console.log("MongoDB Conectado");
        app.listen(3000);
    })
    .catch(err => console.log(err));
