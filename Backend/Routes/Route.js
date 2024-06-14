const express = require('express');
const {maincontroller, usersignin, userlogin, getuser} = require ('../controllers/maincontroller')
const router = express.Router();

router.get('/', maincontroller )
router.post('/register', usersignin) 
router.post('/login', userlogin)


module.exports = router