var express = require('express');
var router = express.Router();
var adminModel = require('../models/admin.model')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express' });
});
router.post('/register',async (req,res) => {
  try {
    const { username, email, fullname, password } = req.body;

    const userData = new adminModel({
      username: username,
      password: req.body.psw

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
})
module.exports = router;
