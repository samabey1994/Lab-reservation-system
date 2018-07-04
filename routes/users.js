const express =  require('express');
const router = express.Router();
const passport =  require('passport');
const jwt =  require('jsonwebtoken');
const config =  require('../config/database');
const User = require('../models/user');

//Register
router.post('/register', (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    userType:"user"
  });

User.addUser(newUser, (err, user) => {
  if(err){
    res.json({sucess: false, msg:'Failed to register user'});
  } else {
    res.json({sucess: true, msg:'User registered'});
  }

});
});


//Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token =  jwt.sign({data:user}, config.secret, {
          expiresIn: 604800 // 1week
        });
        res.json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            userType: user.userType
            
          }
        });
      } else{
        return res.json({success: false, msg: 'Wrong password'});
      }
    })
  });
});

//profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user:req.user});
});

//admin panel
router.get('/viewUser', function(req, res, next){
  User.getUsers({}, function(err, users){
      if(err){
          throw err;
      } else {
          res.json({users:users});
      }
      
  });    
});


module.exports = router;
