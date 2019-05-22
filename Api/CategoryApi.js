const express = require('express');
const bodyParser = require('body-parser');
const Category = require('../models/category');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const { permit, tokenVerify } = require('../middleware/AuthInfrastructure');


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(tokenVerify);


app.get('/Categories', (req, res) => {

  let from = Number(req.query.from || 0);
  let limit = Number(req.query.limit || 10);

  Category.find({})
    .skip(from)
    .limit(limit)
    .sort('name')
    .populate('user')
    .exec((err,categories) => {
      if(err){
        return res.status(400).json({
                      success: false, 
                      err: err
                  });
      }
    
      res.json({ 
        success: true,
        resultCount: categories.length,
        categoriesCollection: categories
      });

    });


});
 
app.get('/Categories/:id', (req, res) => {

  let id = req.params.id;

  Category.findById(id)

    .exec((err,category) => {
      if(err){
        return res.status(400).json({
                      success: false, 
                      err: err
                  });
      }
    
      res.json({ 
        success: true,
        category: category
      });

    });
});

app.post('/Categories', permit('ADMIN_ROLE'), function (req, res) {
  let body = req.body;
  let user = req.user;

  let category = new Category({ 
    name:body.name,
    description: body.description,
    user: user._id
   })

   category.save((err, dbCategory) => {
    if(err){
      return res.status(400).json({
                    success: false, 
                    err: err
                });
    }
    res.json({ 
      success: true,
      Category: dbCategory
    });

   });

});

app.put('/Categories/:id', permit('ADMIN_ROLE'),function (req, res) {
  let id = req.params.id;
  let body = req.body;

  Category.findByIdAndUpdate(id, body, { new: true }, (err, dbCategory) => {
    if(err){
      return res.status(400).json({
                    success: false, 
                    err: err
                });
    }
  
      res.json({ 
        success: true,
        category: dbCategory
      });
   })
   .where({status:true});
});

app.delete('/Categories/:id',permit('ADMIN_ROLE'), function (req, res) {
  let id = req.params.id;

    //Hard delete
    Category.findByIdAndDelete(id, (err, dbCategory) => {
      if(err){
        return res.status(400).json({
                      success: false, 
                      err: err
                  });
      }
    
      if(!dbCategory){
        return res.status(404).json({
          success: false, 
          err: 'Category not found'
        });
      }
      
      res.json({ 
        success: true,
        category: dbCategory
      });
  
  });
});

module.exports = app;