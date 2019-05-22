const express = require('express');
const fs = require('fs');
const path = require('path');

const _validTypes = ['Products', 'Users'];

const app = express();

app.get('/images/:type/:filename', function(req, res) {
    let type = req.params.type;
    let filename = req.params.filename;
    
    if(_validTypes.indexOf(type) < 0){
        return res.status(400).json({ success: false, err: 'Invalid file type'});
    }

    let imagepath = path.resolve(__dirname,`../uploads/${type}/${filename}`);

    if(!fs.existsSync(imagepath)){
        imagepath =  path.resolve(__dirname,`../Assets/no-image.jpg`);
    }

    res.sendFile(imagepath);
});

module.exports = app;