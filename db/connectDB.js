const mongoose = require('mongoose')
const connectDB = (req,res) => {
    try {
        mongoose.connect('mongodb://localhost/schoolmanagement')
        console.log("database connected")
    } catch (error) {
        console.error(error)
    }
}
module.exports = connectDB;