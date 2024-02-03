var express = require('express');
var router = express.Router();
// passport-config.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User= require('../models/admin.model');
const Teacher= require('../models/teacher.model');
const Student= require('../models/student.model');

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
// passport-config.js
// ... (existing code)

passport.use('teacher', new LocalStrategy(
  { usernameField: 'username', passwordField: 'password' },
  async (username, password, done) => {
    try {
      console.log('Attempting to authenticate teacher:', username, password);
      const teacher = await Teacher.findOne({ username });

      if (!teacher) {
        console.log('Teacher not found');
        return done(null, false, { message: 'Incorrect username or password' });
      }

      const passwordMatch = await bcrypt.compare(password, teacher.password);

      if (!passwordMatch) {
        console.log('Incorrect password');
        return done(null, false, { message: 'Incorrect username or password' });
      }

      console.log('Teacher authentication successful');
      return done(null, teacher);
    } catch (error) {
      console.error('Error during teacher authentication:', error);
      return done(error);
    }
  }
));

// ... (existing code)
// routes/index.js
// ... (existing code)

// Handle teacher login form submission using Passport
router.post('/teacher/login',
  passport.authenticate('teacher', {
    successRedirect: '/teacher/dashboard',
    failureRedirect: '/login',
    failureFlash: true,
  })
);
// routes/index.js
// ... (existing code)

// Display the teacher dashboard (requires authentication)
router.get('/teacher/dashboard', async (req, res) => {
  try {
    const user = await Teacher.findOne({
      username: req.session.passport.user,
    }).populate("Students");
    
    // Render the EJS file with teacher data
    res.render('teacherDashboard', { user });
  } catch (error) {
    console.error(error);
    res.status(500).redirect('/your-route')
  }
});

// ... (existing code)

// ... (existing code)


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
const isAdmin =(req, res, next) => {
  // Assuming you have a way to determine if a user is an admin, for example, a property in the user object
  if (req.user && req.user.isAdmin) {
    // User is an admin, proceed to the next middleware or route handler
    next();
  } else {
    // User is not an admin, send a forbidden response or redirect as per your routerlication's requirements
    res.status(403).send("Forbidden: You don't have permission to access this resource.");
  }
}


// Display the dashboard (requires authentication)
router.get('/dashboard', isAuthenticated,isAdmin,async (req, res) => {
  try {
    const teacher = await Teacher.find();
    const student = await Student.find();
    // Render the EJS file with teacher data
    res.render('adminDashboard', {teacher,student})
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
});
router.post('/your-route', passport.authenticate('teacher', {
  successRedirect: '/teacher/dashboard',
  failureRedirect: '/your-route',
  failureFlash: true,
}))
router.post('/admin/addUser', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // Hash the password
    const newTeacher = new Teacher({
      // ... (your existing code to create a new teacher)
      lastName: req.body.lname,
      firstName: req.body.fname,
      age: req.body.age,
      dob:req.body.dob,
      address:req.body.address,
      city:req.body.city,
      cnic:req.body.cnic,
      gender:req.body.gender,
      email:req.body.email,
      // avatar:req.file.filename,
      subject: req.body.subject,
      section: req.body.section,
      password: hashedPassword,
      username: req.body.username,
      role:req.body.role,
      isAdmin:req.body.isAdmin,
    });

    await newTeacher.save();

    // Send a response and terminate the route handler
    return res.redirect("/dashboard");
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
});

router.post('/admin/addStudent', async (req, res) => {
 

  try {
     const teacher = await Teacher.findOne({cnic:req.body.tcnic}).populate('students');

    
         const newstudent = new Student({
          firstName: req.body.fname,
          lastName: req.body.lname,
          age: req.body.age,
          dob:req.body.dob,
          address:req.body.address,
          city:req.body.city,
          cnic:req.body.cnic,
          gender:req.body.gender,
          email:req.body.email,
          // avatar:req.file.filename,
          class: req.body.class,
          rollNo: req.body.roll,
          password: req.body.password,
          username: req.body.username,
          role:req.body.role,
          subject: req.body.subject,
          section: req.body.section,
          password: req.body.password,
          username: req.body.username,
          role:req.body.role,
          teachercnic:req.body.tcnic,
          isAdmin:req.body.isAdmin, });
         newstudent.save();
         teacher.students.push(newstudent)
         await teacher.save();
         console.log(teacher)
      
    

      res.redirect("/dashboard");
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
});
router.use(express.json());
// Route to remove a user by ID
router.delete('/api/removeTeacher/:id', async (req, res) => {
  const teacherId = req.params.id;
  try {
      // Find and remove the teacher with the given ID
      const removedTeacher = await Teacher.findOneAndDelete({ _id: teacherId });
      if (!removedTeacher) {
          return res.status(404).json({ error: 'Teacher not found' });
      }
      res.json({ message: 'Teacher removed successfully', removedTeacher });
  } catch (error) {
      // Handle error
      console.error('Error removing teacher:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.post('/admin/removeStudent/:id', async (req, res) => {
  const studentId = req.params.id;

  try {
    // Assuming you're using Mongoose for MongoDB
    const removedStudent = await Student.findByIdAndDelete(studentId);

    if (!removedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    return res.json({ message: 'Student removed successfully', removedStudent });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

function isAuthenticated(req, res, next) {
  
  if (req.isAuthenticated()) {
    return next(); 
  } else {
    
    res.redirect('/login'); 
  }
}

// Add a teacher
// Define your authentication middleware
function isTeacherAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/your-route'); // Update the route to match your actual teacher login route
  }
}

// Use the middleware for the specific route
router.get('/your-route', async (req, res) => {
  try {
    // Your route logic here
    res.render('teacherLogin'); // Assuming you have a separate EJS file for the teacher dashboard
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
router.get('/logout',(req,res) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
})



module.exports = router;
