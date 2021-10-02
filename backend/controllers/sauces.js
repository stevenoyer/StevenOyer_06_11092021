const Sauces = require('../models/Sauces')
const fs = require('fs')

// Créé une sauce
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce)
    delete sauceObject._id

    const sauce = new Sauces({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })

    sauce.save()
        .then(() => res.status(201).json({message: 'La sauce a bien été postée.'}))
        .catch(error => res.status(400).json({message: error}))

}

// Récupère une sauce par rapport à son ID
exports.getOneSauce = (req, res, next) => {
    Sauces.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(400).json({message: error}))
}

// Supprime une sauce par rapport à son ID
exports.deleteSauce = (req, res, next) => {
    Sauces.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1]
            fs.unlink(`images/${filename}`, () => {
                Sauces.deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json({message: 'La sauce a bien été supprimée.'}))
                .catch(error => res.status(400).json({message: error}))
            })
        })
        .catch(error => res.status(400).json({message: error}))
}

// Modifie une sauce par rapport à son ID
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
    {
        ...JSON.parse(req.body.sauces),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body }
    Sauces.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({message: 'La sauce a bien été modifiée.'}))
        .catch(error => res.status(400).json({message: error}))
}

// Récupère toutes les sauces
exports.getAllSauces = (req, res, next) => {
    Sauces.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({message: error}))
}

// Like/Dislike
exports.likeOrDislike = (req, res, next) => {
    let like = req.body.like
    let userID = req.body.userId
    let sauceID = req.params.id

    Sauces.findById(sauceID).then(sauce => {

        let liked = sauce.usersLiked
        let disliked = sauce.usersDisliked

        switch (like) {
            case 1:
                if (liked.indexOf(userID) == -1){
                    liked.push(userID);
                    if (disliked.indexOf(userID) != -1){
                        disliked.splice(disliked.indexOf(userID),1)
                    }
                }
                break

            case -1:
                if (disliked.indexOf(userID) == -1){
                    disliked.push(userID);
                    if (liked.indexOf(userID) != -1){
                        liked.splice(liked.indexOf(userID), 1)
                    }
                }
                break

            case 0:
                liked.indexOf(userID) != -1 ? liked.splice(liked.indexOf(userID), 1) : console.log('')
                disliked.indexOf(userID) != -1 ? disliked.splice(disliked.indexOf(userID), 1) : console.log('')
                break
        }

        const likes = liked.length
        const dislikes = disliked.length

        console.log(sauce)

        Sauces.updateOne({_id: sauceID}, {
            likes: likes,
            dislikes: dislikes,
            usersLiked: liked,
            usersDisliked: disliked

        }, (err, nb) => {console.log('Erreur => ', nb)})

        res.status(200).json({message: 'Like modifié'})
    })
    .catch(error => res.status(400).json({message: error}))

}

// Retourne les erreurs
exports.error = (err, req, res, next) => {
    res.status(401).json({message: err})
}