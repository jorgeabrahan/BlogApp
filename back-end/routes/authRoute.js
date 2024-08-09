const express = require('express')
const passport = require('passport')
const router = express.Router()
const authController = require('../controllers/authController');

router.get('/google', authController.googleAuth)
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: process.env.FRONTEND_URL }),
  authController.googleCallback
)

router.get('/facebook', authController.facebookAuth)
router.get(
  '/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: process.env.FRONTEND_URL }),
  authController.facebookCallback
)

router.get('/logout', authController.logout)

module.exports = router
