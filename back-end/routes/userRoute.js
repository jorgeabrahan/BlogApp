const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const { ensureAuthenticated } = require('../middlewares')

router.get('/', ensureAuthenticated, userController.getAuthenticatedUser)

router.get('/:alias', userController.getUserByAlias)

router.put('/profile', ensureAuthenticated, userController.updateProfile)

router.post('/follow/:userId', ensureAuthenticated, userController.followUser)
router.post('/unfollow/:userId', ensureAuthenticated, userController.unfollowUser)

module.exports = router
