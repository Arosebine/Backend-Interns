const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');




exports.createUser = async (req, res) => {
    try {
        const { first_name, last_name, email, password, address, phone_number   } = req.body;
        // validate? 
        if (!first_name ||!last_name  ||!email ||!password ) {
            return res.status(400).json({
                error: 'Please fill all the fields!'
            });
        }
        const existEmail = await User.findOne({ email })
        if(existEmail){
            return res.status(500).send("user is already exist")
        }
        const phoneNumber = await User.findOne({ phone_number })
        if(phoneNumber){
            return res.status(500).send('Phone Number is already exist')
        }       
       
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({
             first_name,
             last_name, 
             email, 
             password: hashedPassword, 
             address, 
             phone_number, 
             });
            
         res.status(201).send({ 
            status: "You have successfully registered", data: user
        })
            
    } catch (error) {
        res.status(500).send({message: error.message })
        console.log(error);
    }
 };



 exports.loginPage = async (req, res) => {
  const { password, email } = req.body;
  try {
    // validation
    if (!(password && email)) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }
    // check if user exist in database
    const checkUser = await User.findOne({ email: email });
    // if user doesn't exist throw error
    if (!checkUser) {
      return res.status(404).json({ message: 'user not found' });
    }
    
    // if user exist in database, check if user password is correct
    const checkPassword = await bcrypt.compare(password, checkUser.password);
    // if user password is not correct throw error ==> invalid credentials
    if (!checkPassword) {
        return res.status(400).json({ message: 'invalid credentials' });
    }
    console.log(checkPassword);
    // if user password is correct tokenize the payload
    const payload = {
      _id: checkUser._id,
    };
    const token = await jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: '30mins',
    });
    // store token in cookie ====> web browser local storage
    res.cookie('access-token', token);
    res.status(200).json({ message: 'user logged in successfully', user: checkUser, token: token });
      
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: error.message, message: 'internal server error' });
  }
};




exports.viewAll = async(req, res)=>{
    try {
        const users = await User.find({});
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send({
            error: error.message,
            message: "Internal server error"
        })
    }
};



exports.viewSingleUser = async(req, res)=>{
    try {
        const email = req.params.email;
        const user = await User.findOne({ email })
        if(!user){
            res.status(404).send("User's email not exist")
        }
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send({
            error: error.message,
            message: "server error"
        })
    }
};



exports.updateUser = async(req, res)=>{
    try {
        const { email, first_name, last_name, address, phone_number, } = req.body;

        const user = await User.findOneAndUpdate(
            { email: email },
            {
                first_name,
                last_name, 
                address, 
                phone_number,                 
            },
            {
                new: true,
            })
            res.status(200).send({ status: "successfully updated" })
    } catch (error) {
        res.status(500).send({
            error: error.message,
            message: "server error"
        })
    }
}



exports.deleteUsers = async(req, res)=>{
    try {
        const deleteAll = await User.find({})
        res.status(200).send({ 
            status: 'You have successfully deleted all users', 
            Data: deleteUser });
    } catch (error) {
        res.status(500).send({
            error: error.message,
            message: "server error"
        })
    }
};



exports.deleteUserByEmail = async(req, res)=>{
    try {
        const email = req.params.email;
        const deleteUser = await User.findOneAndDelete({ email })
        res.status(200).send({ 
            status: 'User deleted successfully', 
            Data: deleteUser });
    } catch (error) {
        res.status(500).send({
            error: error.message,
            message: "server error"
        })
    }
}