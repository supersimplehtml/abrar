const passport = require('passport');
const Login  = (req,res) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true,
  })
}
  module.exports = {Login};