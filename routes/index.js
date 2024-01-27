var express = require('express');
var router = express.Router();
// passport-config.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userModel = require('../models/admin.model');


passport.use(new LocalStrategy(userModel.authenticate()));
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());



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
router.post('/register', async function (req, res) {
  try {
    const { username, email, fullname, psw } = req.body;

    const userData = new userModel({
      username: username,
    });

    // Assuming userModel.register returns a promise
    await userModel.register(userData, psw);

    // Authenticate the user after successful registration
    passport.authenticate('local')(req, res, function () {
      // Redirect to the profile page after successful registration and authentication
     
    })
    .then( res.redirect('/profile'))
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.post('/login', passport.authenticate('local', {
  
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true
}));

module.exports = router;
