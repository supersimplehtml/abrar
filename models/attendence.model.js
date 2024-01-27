const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  date: { type: Date, default: Date.now },
  isPresent: { type: Boolean, default: false },
  // other attendance-related fields
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
