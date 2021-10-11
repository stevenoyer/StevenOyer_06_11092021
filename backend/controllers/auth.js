const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const env = require('dotenv').config()

// Inscription de l'utilisateur
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            })

            user.save()
                .then(() => res.status(201).json({message: 'Utilisateur créé.'}))
                .catch(error => res.status(400).json({error}))
        })
        .catch(error => res.status(500).json({error}))
}

// Connexion de l'utilisateur et création d'un TOKEN
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'L\'utilisateur n\'existe pas.' })
            }

            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Le mot de passe est incorrect.' })
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.TOKEN_SECRET,
                            { expiresIn: '24h' }
                        )
                    })
                })
                .catch(error => res.status(500).json({error}))
        })
        .catch(error => res.status(500).json({error}))
}

// Gestion des erreurs
exports.error = (err, req, res, next) => {
    console.log('Erreur')
    res.status(401).json({ message: 'Erreur ' + err })
}