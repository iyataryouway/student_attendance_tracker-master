const express = require('express');
const authController = require('../controllers/authController.js');
const router = express.Router();

//setup the views
router.get('/login', (req, res) =>{ res.render('login')});
router.get('/register', (req, res) =>{ res.render('register')});

//map to controller actions
router.post('/login', authController.login);
router.post('/register', authController.register);
//router.post('/logout', authController.logout);

module.exports = router;