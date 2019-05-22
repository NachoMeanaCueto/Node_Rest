const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.googleClientId);

const app = express();


app.post('/login', (req, res) => {
 
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

async function verify(token) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.googleClientId
  });
  const payload = ticket.getPayload();
  
  return {

    name: payload.name,
    email: payload.email,
    img: payload.picture,
    google:true,

  }

}



app.post('/googleLogin', async (req, res) => {

  let token = req.body.id_token;

  let googleUser = await verify(token)
                .catch(err => {
                        return status(403).json({
                          success: false,
                          err: err
                        });
                     });

 

  User.findOne({ email: googleUser.email }, (err, dbUser) => { 

      if(err){
        return status(500).json({
          success: false,
          err: err
        });
      }

      if(dbUser){
        if(!dbUser.google){
          return status(400).json({
            success: false,
            err: { message: 'Authentication failed' }
          });
        }

        token = jwt.sign({ user: dbUser }, process.env.TokenSecret, { expiresIn: process.env.TokenExpireTime });

        return res.json({
          success : true,
          user: dbUser,
          token: token
        });

      }
      else
      {
          let user = new User({ 
            name:googleUser.name,
            email:googleUser.email,
            google:true,
            password:'password'
          })
        
          user.save((err, dbUser) => {
        
            if(err) {
              return res.status(400)
              .json({
                    success: false, 
                    err: err
                });
            }
          
            token = jwt.sign({ user: dbUser }, process.env.TokenSecret, { expiresIn: process.env.TokenExpireTime });

            return res.json({
              success : true,
              user: dbUser,
              token: token
            });
        });
    
      }

  });


});

module.exports = app;