const express = require('express')
const router = express.Router()
const saucesCtrl = require('../controllers/sauces')
const auth = require('../middleware/auth')
const upload_file = require('../middleware/multer-config')

router.post('/', auth, upload_file, saucesCtrl.createSauce)
router.get('/', auth, saucesCtrl.getAllSauces)
router.delete('/:id', auth, saucesCtrl.deleteSauce)
router.put('/:id', auth, upload_file, saucesCtrl.modifySauce)
router.get('/:id', auth, saucesCtrl.getOneSauce)

module.exports = router