const session = require('express-session')

const expressSessionSetup = session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }, // 1 day
})

module.exports = {
  expressSessionSetup
}