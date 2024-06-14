const express = require('express')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../Modals/userModel')


const maincontroller = (req, res) => {
    res.send('Hello World! checking this one first')
}


// signing up the user

const usersignin =  async(req, res) => {
    const {fullname, email, password} = req.body 
  
    const hashedpassword = await bcrypt.hash(password, 10); 
    
    const newUser =  new userModel({
      fullname,
      email,
      password: hashedpassword
    })
  
    const userCreated = await newUser.save()
    if(!userCreated) {
      console.log("user cannot be created");
      return res.status(500).send("user cannot be created")
    } else {
      console.log("user has been created to the database");
      return res.status(200).send("user has been created to the database")
    }
  };


// logging in the user

 const userlogin = async(req, res) => {
    const { email, password } = req.body;
  
    
    const user = await userModel.findOne({ email });
  
    if (!user) {
      return res.status(401).send('Invalid email or password');
    }
  
    
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
  
    if (!isPasswordCorrect) {
      
      return res.status(401).send('Invalid email or password');
    }
  

    const mysecretkey = process.env.SECRET_CODE;
  
    
    const payload = {
      fullName: user.fullName,
      email: user.email,
      password: user.password,
    };
    
    const token = jwt.sign(payload, mysecretkey, { expiresIn: '5d' });
    res.setHeader('Authorization', `Bearer ${token}`);
  

    res.status(200).json({
      msg: "User is logged in",
      token: token
    });
  };


const getuser = async (req, res) => {
    const authorizationHeader = req.headers.authorization;

    // Check if the Authorization header is present
    if (!authorizationHeader) {
        return res.status(401).json({ error: 'Authorization header missing' });
    }

    const token = authorizationHeader.split(' ')[1]; // Get token from Authorization header
    const mysecretkey = process.env.SECRET_CODE;

    try {
        // Verify token and decode payload
        const decoded = jwt.verify(token, mysecretkey);

        // Get user email from payload
        const userEmail = decoded.email;

        // Find user by email in the database
        const user = await userModel.findOne({ email: userEmail });

        if (user) {
            res.json({ message: `Welcome ${user.fullname}! This is a protected route.` });
        } else {
            res.status(401).json({ error: 'Invalid token' });
        }
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};
  



module.exports = {maincontroller, usersignin, userlogin, getuser}

