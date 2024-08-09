const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')

router.get('/recommended', usersController.getUsersWithLimit)

module.exports = router
