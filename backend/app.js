const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const sanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const helmet = require('helmet')
const path = require('path')
const mongoose = require('mongoose')
const env = require('dotenv').config()

// Connexion à notre base de données
mongoose.connect('mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@cluster0.ibqd8.mongodb.net/' + process.env.DB_COLLECTION + '?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connexion à la base de données réussie.'))
.catch(() => console.warn('Erreur lors de la connexion à la base de données.'))

// Routes
const auth = require('./routes/auth')
const sauces = require('./routes/sauces')


// Middleware Header (autorise les échanges)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')    
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')    
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
})

// Rend les données du corps de la requête exploitable
app.use(bodyParser.json())

app.use(helmet()) // Helmet permet de protéger l'application de certaines vulnérabilités bien connues
app.disable('x-powered-by') // Enlève "express" pour éviter les attaques ciblés
app.use(sanitize({replaceWith: '_'})) // Remplace tous les caractères interdits par des "_" | Empêche l'injection d'opérateur MongoDB
app.use(xss()) // Permet de nettoyer les entrées utilisateurs
app.use('/images', express.static(path.join(__dirname, 'images'))) // Défini le dossier image comme static afin de permettre à l'application d'accéder aux images
app.use('/api/sauces', sauces) // Sauces
app.use('/api/auth', auth) // Authentification

module.exports = app