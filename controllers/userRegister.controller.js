const passport = require('passport');
const User= require('../models/admin.model');
const bcrypt = require('bcrypt');
const registerAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.send('Username already exists');
    } else {
      const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();
      res.redirect("/dashboard");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}
module.exports =  registerAdmin ;