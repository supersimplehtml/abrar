const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  dob:{type:Date,required:true},
  address:{type:String,required:true},
  city:{type:String,required:true},
  cnic:{type:String,required:true},
  gender:{type:String,required:true},
  email:{type:String,required:true},
  avatar: { type: String, required: true },
  subject: { type: String, required: true },
  section: { type: String, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
});

const teacher = mongoose.model('teacher', teacherSchema);

module.exports = teacher;
