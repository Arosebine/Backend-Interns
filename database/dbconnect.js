const mongoose = require('mongoose');





const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('Backend-Intern Database Connected');
    } catch (error) {
        console.log('Database has been disconnected');
    }
};




module.exports = connectDB;