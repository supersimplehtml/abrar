var express = require('express');
var router = express.Router();
// passport-config.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User= require('../models/admin.model');
passport.use(new LocalStrategy(
  { usernameField: 'username', passwordField: 'password' },
  async (username, password, done) => {
    try {
      console.log('Attempting to authenticate:', username, password);
      const user = await User.findOne({ username });
      console.log('User found:', user);

      if (!user) {
        console.log('User not found');
        return done(null, false, { message: 'Incorrect username or password' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      console.log('Password match:', passwordMatch);

      if (!passwordMatch) {
        console.log('Incorrect password');
        return done(null, false, { message: 'Incorrect username or password' });
      }

      console.log('Authentication successful');
      return done(null, user);
    } catch (error) {
      console.error('Error during authentication:', error);
      return done(error);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});






/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login', (req, res) => {
  res.render('login', { message: req.flash('error') });
});
// Handle login form submission
// Handle login form submission using Passport
router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true,
  })
);


// Display the registration form
router.get('/register', (req, res) => {
  res.render("register")
});

// Handle registration form submission
const bcrypt = require('bcrypt');

// ...

// Handle registration form submission
router.post('/register', async (req, res) => {
  const { username, password,admin } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.send('Username already exists');
    } else {
      const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
      const newUser = new User({ username, password: hashedPassword ,isAdmin:admin});
      await newUser.save();
      res.redirect("/dashboard");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


// Display the dashboard (requires authentication)


// Display the dashboard (requires authentication)
router.get('/dashboard',isAuthenticated,(req, res, next) => {
  // Assuming you have a way to determine if a user is an admin, for example, a property in the user object
  if (req.user && req.user.isAdmin) {
    // User is an admin, proceed to the next middleware or route handler
    next();
  } else {
    // User is not an admin, send a forbidden response or redirect as per your routerlication's requirements
    res.status(403).send("Forbidden: You don't have permission to access this resource.");
  }
}, (req, res) => {
 res.send('hadi')
});
function isAuthenticated(req, res, next) {
  
  if (req.isAuthenticated()) {
    return next(); 
  } else {
    
    res.redirect('/login'); 
  }
}


// Add a teacher


module.exports = router;
