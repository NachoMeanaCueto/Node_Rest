const express = require('express');
const bodyParser = require('body-parser');
const Product = require('../models/product');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const { permit } = require('../middleware/AuthInfrastructure');


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.get('/products', (req, res) => {

  let from = Number(req.query.from || 0);
  let limit = Number(req.query.limit || 10);

  Product.find({})
    .where({available:true})
    .skip(from)
    .limit(limit)
    .sort('name')
    .populate('user')
    .populate('category')
    .exec((err,products) => {
      if(err){
        return res.status(400).json({
                      success: false, 
                      err: err
                  });
      }
    
      res.json({ 
        success: true,
        resultCount: products.length,
        productsCollection: products
      });

    });


});
 
app.get('/products/:id', (req, res) => {

  let id = req.params.id;

  Product.findById(id)
    .where({available:true})
    .exec((err,dbproduct) => {
      if(err){
        return res.status(400).json({
                      success: false, 
                      err: err
                  });
      }
      
      if(!dbproduct){
        return res.status(404).json({
          success: false, 
          err: 'Product not found'
      });
    }
    
      res.json({ 
        success: true,
        products: dbproduct
      });

    });
});

app.get('/products/searchByName/:term', (req, res) => {

  let term = req.params.term;
  let regex = new RegExp(term, 'i');

  Product.find()
    .where({name:regex,available:true})
    .exec((err,dbproduct) => {
      if(err){
        return res.status(400).json({
                      success: false, 
                      err: err
                  });
      }
    
      if(!dbproduct){
        return res.status(404).json({
          success: false, 
          err: 'Product not found'
      });
    }

      res.json({ 
        success: true,
        products: dbproduct
      });

    });
});

app.post('/products', permit('ADMIN_ROLE'), function (req, res) {
  let body = req.body;
  
  let product = new Product({ 
    name:body.name,
    price: body.price,
    description: body.description,
    user: req.user._id,
    category: body.categoryId
   })

   product.save((err, dbProduct) => {
    if(err){
      return res.status(400).json({
                    success: false, 
                    err: err
                });
    }
    res.json({ 
      success: true,
      product: dbProduct
    });

   });

});

app.put('/products/:id', permit('ADMIN_ROLE'),function (req, res) {
  let id = req.params.id;
  let body = req.body;

  Product.findByIdAndUpdate(id, body, { new: true }, (err, dbproduct) => {
    if(err){
      return res.status(400).json({
                    success: false, 
                    err: err
                });
    }
  
    if(!dbproduct){
      return res.status(404).json({
        success: false, 
        err: 'Product not found'
    });
    }
      res.json({ 
        success: true,
        product: dbproduct
      });
   })
   .where({available:true});
});

app.delete('/products/:id',permit('ADMIN_ROLE'), function (req, res) {
  let id = req.params.id;
 
  Product.findByIdAndUpdate(id, { available: false } , { new: true }, (err, dbproduct) => {
    if(err){
      return res.status(400).json({
                    success: false, 
                    err: err
                });
    }
  
    if(!dbproduct){
      return res.status(404).json({
        success: false, 
        err: 'Product not found'
      });
    }
      
    res.json({ 
        success: true,
        product: dbproduct
      });
   })
   .where({available:true});
});
  

module.exports = app;