const express = require('express');
const fs = require('fs');
const path = require('path');

const fileUpload = require('express-fileupload');
const User = require('../models/user');
const Product = require('../models/product');

const { permit } = require('../middleware/AuthInfrastructure');

const app = express();


app.use(fileUpload({ useTempFiles : true, tempFileDir : '/tmp/' }));


let setValidfilePath = (filePath) => {

let counter = 0;
var pointlastIndex = filePath.lastIndexOf('.');

    let filename = filePath.substr(0, pointlastIndex);
    let extension = filePath.substr(pointlastIndex + 1);
    let result = filePath;

    while(fs.existsSync(`${result}`)){
        counter++;
        result = `${filename}_${counter}.${extension}`
    }
    return result;
}

function removeimage(imagename, type) {
    let filepath = path.resolve(__dirname, `../uploads/${type}`, imagename);
    if (fs.existsSync(filepath)) { 
        fs.unlinkSync(filepath);
    }
}

function setUserImage(id, image ,res){

    User.findById(id, (err, dbUser) => {
        if(err){
          removeimage(image, 'Users');
          return res.status(400).json({
                        success: false, 
                        err: err
                    });
        }
      
        if(!dbUser){
            removeimage(image, 'Users');
            return res.status(404).json({
              success: false, 
              err: 'User not found'
          })
        }

        if(dbUser.img)
            removeimage(dbUser.img, 'Users');

        dbUser.img = image;

        dbUser.save((err, savedUser) => {
            if(err){
                return res.status(400).json({
                              success: false, 
                              err: err
                          });
              }

              res.json({ 
                success: true,
                user: savedUser
                });
        })
       })
       .where({status:true});
}

function setProductImage(id, image ,res){

    Product.findById(id, (err, dbProduct) => {
    if(err){
        removeimage(image, 'Products');
        return res.status(400).json({
                        success: false, 
                        err: err
                    });
        }
      
        if(!dbProduct){
            removeimage(image, 'Products');
            return res.status(404).json({
              success: false, 
              err: 'Product not found'
          })
        }

        if(dbProduct.img)
            removeimage(dbProduct.img, 'Products');

        dbProduct.img = image;
        
        dbProduct.save((err, savedProduct) => {
            if(err){
                return res.status(400).json({
                              success: false, 
                              err: err
                          });
              }

              res.json({ 
                success: true,
                product: savedProduct
                });
        })
       })
       .where({available:true});
}

app.post('/upload/:type/:id', function(req, res) {

    let validTypes = ['Products', 'Users'];
    let validExtensions = ['image/jpg','image/png','image/gif','image/jpeg'];

    if (Object.keys(req.files).length == 0) {
      return res.status(400).json({ success: false, err: 'No files were uploaded.'});
    }

    let type = req.params.type;
    let id = req.params.id;
    let file = req.files.file;
    let filepath;

    if(validTypes.indexOf(type) < 0){
        return res.status(400).json({ success: false, err: 'Invalid file type'});
    }

    if(validExtensions.indexOf(file.mimetype) < 0) {
        return res.status(400).json({ success: false, err: 'Invalid file extension'});
    }

    filepath = setValidfilePath(`./uploads/${type}/${ file.name }`)

    file.mv(filepath , function(err) {
      if (err){
        return res.status(500).json({ success: false, err: err });
      }
       
        let image = filepath.substr(filepath.lastIndexOf('/') + 1);
        
        switch(type){
            case 'Users':
                    setUserImage(id, image ,res);
                break;
            case 'Products':
                    setProductImage(id, image ,res);
                break;
            default:
                return res.status(400).json({ success: false, err: 'Invalid file type'});
              
        }
    });
});

module.exports = app;