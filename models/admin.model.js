const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');
const connectDB = require('../db/connectDB');
connectDB()
const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String},
  isAdmin: { type: Boolean, default: true },
  // other admin-related fields
});
adminSchema.plugin(plm)
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
