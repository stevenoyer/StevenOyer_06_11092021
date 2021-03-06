const mongoose = require('mongoose')

// On créé un schema stricte pour nos objets afin de les stocker dans la base de données
const SauceSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number, required: false },
    dislikes: { type: Number, required: false },
    usersLiked: { type: Array, required: true },
    usersDisliked: { type: Array, required: true },
})

module.exports = mongoose.model('Sauce', SauceSchema)