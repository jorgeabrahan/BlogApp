const cors = require('cors');

const ALLOWED_ORIGINS = ['http://localhost:3000'];

const corsSetupMiddleware = cors({
  origin: (origin, callback) => {
    if (ALLOWED_ORIGINS.includes(origin) || !origin) {
      return callback(null, true);
    }
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
});

module.exports = {
  corsSetupMiddleware
}