require('dotenv').config()
const mongoose = require('mongoose');

const connectDB = async()=>{

    console.log("✅ Database has been connected==>")
    return mongoose.connect(process.env.MONGOURI)
    
}

module.exports = connectDB;