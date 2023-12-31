const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const crypto = require('crypto');
const {body, validationResult} = require('express-validator');
const { error } = require('console');


const secret_key = process.env.MY_SECRET_KEY;
const hashedSHA256key = crypto.createHash('sha256').update(secret_key).digest('hex');

module.exports.register = async(req, res) => {
    try {                                                                                                                                                
        const { email, password, isAdmin } = req.body;

        if(!email){
          return res.status(400).json({ message: 'please provide email address - email address can not be empty' });
        }

        if(!password){
          return res.status(400).json({ message: 'please provide password - password can not be empty' });
        }

        await body('email').isEmail().withMessage('Invalid email address - please provide correct email address').run(req);
        
        // can add many more functionalities
        await body('password').isLength({ min: 6}).withMessage('Invalid password address - must be atleast 6 characters long').run(req);


        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          const errorResponse = {}; 

          errors.array().forEach(error => {

            if (error.path === 'email') {
          
              errorResponse.email = error.msg;

            } else if (error.path === 'password') {
  
              errorResponse.password = error.msg;
            } else {
            }
           
          });
          return res.status(422).json(errorResponse);

        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: 'User already exists' });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
  
        const user = new User({
          email,
          password: hashedPassword,
          isAdmin: isAdmin || false,
        });
    
        // Saving user to the database
        await user.save();
    
        res.status(201).json({ message: 'User registered successfully!' });
      } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
      }

}


module.exports.login = async(req, res) => {

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
    
        if (!user) {
          return res.status(401).json({ message: 'Authentication failed' });
        }
    
        // password comparison 
        const isPasswordValid = await bcrypt.compare(password, user.password);
    
        if (!isPasswordValid) {
          return res.status(401).json({ message: 'Authentication failed' });
        }
    
        // JWT token
        const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, hashedSHA256key);
        
        res.cookie('token', token, { httpOnly: true, secure: true });
        res.status(200).json({ message: 'Login successful' });
      } 
      catch (error) {
        res.status(500).json({ message: 'An error occurred' });
      }

}



module.exports.logout = async(req, res) => {

    try{
        const token = req.cookies.token;
        res.clearCookie('token');
        res.status(200).json({ message: 'User logged out successfully' });
    }catch (error){
        res.status(500).json({ message: 'An error occurred' });
    }

}


