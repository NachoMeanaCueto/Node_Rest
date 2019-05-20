const User = require('../models/user');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const { permit } = require('../middleware/AuthInfrastructure');
const app = require('./BaseApi');



app.get('/user', (req, res) => {

  let from = Number(req.query.from || 0);
  let limit = Number(req.query.limit || 10);

  User.find({}, 'name email status')
    .where({status:true})
    .skip(from)
    .limit(limit)
    .exec((err,users) => {
      if(err){
        return res.status(400).json({
                      success: false, 
                      err: err
                  });
      }
    
      res.json({ 
        success: true,
        userCollectionCount: users.length,
        userCollection: users
        
      });

    });


});
 
app.post('/user', permit('ADMIN_ROLE'), function (req, res) {
  let body = req.body;

  let user = new User({ 
    name:body.name,
    email:body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role,
   })

   user.save((err, dbUser) => {

    if(err){
      return res.status(400).json({
                    success: false, 
                    err: err
                });
    }
  
    res.json({ 
      success: true,
      user: dbUser
    });

   });

});

app.put('/user/:id', permit('ADMIN_ROLE'),function (req, res) {
  let id = req.params.id;
  let body = _.pick(req.body,['name','role','status']) ;
  
  User.findByIdAndUpdate(id, body , { new: true, runValidators: true }, (err, dbUser) => {
    if(err){
      return res.status(400).json({
                    success: false, 
                    err: err
                });
    }
  
      res.json({ 
        success: true,
        user: dbUser
      });
   })
   .where({status:true});
});

app.delete('/user/:id',permit('ADMIN_ROLE'), function (req, res) {
 
  //Soft delete
  User.findByIdAndUpdate(req.params.id, { status: false } , { new: true }, (err, dbUser) => {
    if(err){
      return res.status(400).json({
                    success: false, 
                    err: err
                });
    }
    
    if(!dbUser){
      return res.status(404).json({
                    success: false, 
                    err: 'User not found'
                });
    }

      res.json({ 
        success: true,
        user: dbUser
      });
   })
   .where({status:true})

  //Hard delete
  // User.findByIdAndDelete(id, (err, dbUser) => {
  //   if(err){
  //     return res.status(400).json({
  //                   success: false, 
  //                   err: err
  //               });
  //   }
  
  //   if(!dbUser){
  //     return res.status(404).json({
  //       success: false, 
  //       err: 'user not found'
  //     });
  //   }
    
  //     res.json({ 
  //       success: true,
  //       user: dbUser
  //     });
   


  // res.json({ userToDelete: id })
});


module.exports = app;