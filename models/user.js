const mongoose = require('mongoose');
const validator = require('mongoose-unique-validator');

let roleEnum = {
    values: ['ADMIN_ROLE','USER_ROLE'],
    message: 'Invalid role: {VALUE}'
}

let userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'the name is required']
    },
    email: {
        type:String,
        unique: true,
        required: [true, 'The mail is required']
    },
    password: {
        type: String,
        required: [true, 'The password is required']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE',
        enum: roleEnum
    },
    status: {
        type:Boolean,
        default:true
    },
    google:{
        type: Boolean,
        default: false
    }
}).plugin(validator, { message : '{PATH} must be unique' });


userSchema.methods.toJSON = function(){

    let completeUser = this;
    let completeUserObject = completeUser.toObject();
    delete completeUserObject.password;

    return completeUserObject;
}


module.exports = mongoose.model('user', userSchema);