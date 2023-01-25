const mongoose = require('mongoose');







const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        trim: true,
    },
    last_name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        require: true,
    },
    password: {
        type: String,
        trim: true,
        require: true,
        min: 5,
        max: 60
    },
    phone_number: {
        type: String,
        trim: true,
    },
    address: {
        type: String,
        trim: true,
    },
    
    
},
{
    timestamps: true,
}
);




module.exports = mongoose.model('User', userSchema);