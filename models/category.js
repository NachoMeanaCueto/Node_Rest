const mongoose = require('mongoose');
const validator = require('mongoose-unique-validator');


let categorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'the name is required']
    },
    description: {
        type:String, 
        required: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user',
        required: [true, 'The user is required']
    }
}).plugin(validator, { message : '{PATH} must be unique' });


module.exports = mongoose.model('category', categorySchema);