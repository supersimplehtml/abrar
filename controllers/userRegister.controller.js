const adminModel = require("../models/admin.model")
const passport = require('passport');
const register =async (req,res) => {
    try {
    const { username, email, fullname, password } = req.body;

    const userData = new adminModel({
      username: username,
      email: email,
      fullname: fullname,

    });

    // Assuming userModel.register returns a promise
    await adminModel.register(userData, password);

    // Authenticate the user after successful registration
    passport.authenticate('local')(req, res, function () {
      // Redirect to the profile page after successful registration and authentication
      res.redirect('/profile');
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
  module.exports = register;