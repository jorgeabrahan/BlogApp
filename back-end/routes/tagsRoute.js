const express = require('express')
const router = express.Router()
const tagsController = require('../controllers/tagsController')
const { ensureAuthenticated } = require('../middlewares')

router.get('/', tagsController.getAllTags)
router.post('/', ensureAuthenticated, tagsController.createTag);

module.exports = router
