const passport = require('passport');

exports.googleAuth = passport.authenticate('google', { scope: ['email', 'profile'] });

exports.googleCallback = (req, res) => {
  req.session.save()
  res.redirect(process.env.FRONTEND_URL)
};

exports.facebookAuth = passport.authenticate('facebook');

exports.facebookCallback = (req, res) => {
  req.session.save()
  res.redirect(process.env.FRONTEND_URL)
};

exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect(process.env.FRONTEND_URL);
  });
};
