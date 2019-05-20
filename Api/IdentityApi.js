
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('underscore');

const app = require('./BaseApi');


app.post('/login', function (req, res) {
 
  let token = null;
  let body = req.body;

  User.findOne({ email: body.email} , (err, dbUser) => {
    

      if(err){
        return res.status(500).json({
          success : false,
          err: err
        });
      }

      if(!dbUser){
        return res.status(400).json({
          success : false,
          err: 'Incorrect user or password'
        });
      }

      if(!bcrypt.compareSync(body.password, dbUser.password)){
        return res.status(400).json({
          success : false,
          err: 'Incorrect password or user'
        });
      }
      
      token = jwt.sign({ user: dbUser }, process.env.TokenSecret, { expiresIn: process.env.TokenExpireTime });

      return res.json({
        success : true,
        user: dbUser,
        token: token
      });

  });   

});



module.exports = app;