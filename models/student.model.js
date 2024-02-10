const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  dob:{type:Date,required:true},
  address:{type:String,required:true},
  city:{type:String,required:true},
  cnic:{type:String,required:true},
  gender:{type:String,required:true},
  // avatar: { type: String, required: true },
  class: { type: String, required: true },
  section: { type: String, required: true },
  rollNo: { type: Number, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  role:{type:String,default:"student"},
  activeCourse:{type:String,required:true},
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
