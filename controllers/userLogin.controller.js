const Login  = (req,res) => {
    passport.authenticate('local', {
  
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
      })
}
  module.exports = Login;