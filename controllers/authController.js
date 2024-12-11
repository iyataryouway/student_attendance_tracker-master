const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const AttendanceManager = require('../models/attendanceManager.js');


exports.register = async (req, res) =>{

   const {email, password, confirmPassword} = req.body;
 
    try {

        const existingUser = await AttendanceManager.findOne({email});

        if(existingUser){
            
            return res.status(400).send('User already exists.  Please try again.');
        }

        if(password !== confirmPassword){
            return res.status(400).send('Passwords do not match.  Please try again.');
        }

        const hashPassword = await bcrypt.hash(password, 12);

        const newUser = new AttendanceManager({
            email,
            password: hashPassword
        });

        await newUser.save();

        res.redirect('/login');

    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }

}

exports.login = async (req, res) =>{

    const {email, password} = req.body;

    try {
      const user = await AttendanceManager.findOne({email});

      if(!user){
        return res.status(404).send('User not found');
      }

      //Verify the password using bcrypt
      const result = await bcrypt.compare(password, user.password);

      console.log(result);

      if(!result){
        return res.status(401).send('Password does not match or is invalid.');
      }

      //Generate a JWT
      const token = jwt.sign({id: user._id }, 'secret_key',{ expiresIn: '5m' });

      //Throw the JWT inside a cookie
      //res.cookie
      res.cookie('jwt', token, {maxAge: 5 * 60 * 1000, httpOnly: true});

      //redirect to home
      res.redirect('/home');

    } catch (error) {
      return res.status(500).send(`Internal Server Error: ${error}`);
    }

}