const express = require('express')
const passport = require('passport')

const dotenv = require('dotenv')
dotenv.config()

const { corsSetupMiddleware, expressSessionSetup } = require('./middlewares')
require('./config/passport')
require('./config/mongoose')

const app = express()
app.disable('x-powered-by')
app.use(corsSetupMiddleware)
app.use(expressSessionSetup)

app.use(passport.initialize())
app.use(passport.session())

const bodyParser = require('body-parser')
app.use(bodyParser.json())

app.use('/auth', require('./routes/authRoute'))
app.use('/user', require('./routes/userRoute'))
app.use('/users', require('./routes/usersRoute'))
app.use('/tags', require('./routes/tagsRoute'))
app.use('/blogs', require('./routes/blogRoute'))

app.get('*', (req, res) => {
  res.status(404).json({ message: '404: NOT_FOUND' });
});

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
