var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var productSchema = new mongoose.Schema({
    name: { 
        type: String,
         required: [true, 'El nombre es necesario'] 
        },
    price: { 
        type: Number, 
        required: [true, 'El precio es necesario'] 
    },
    description: { 
        type: String, 
        required: false 
    },
    available: { 
        type: Boolean, 
        required: true,
        default: true 
    },
    category: {
         type: Schema.Types.ObjectId, 
         ref: 'category', 
         required: true 
        },
    user: { 
        type: Schema.Types.ObjectId,
        ref: 'user'
     }
});


module.exports = mongoose.model('product', productSchema);