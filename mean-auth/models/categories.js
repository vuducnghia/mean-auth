var mongoose = require('mongosse');
var Schema = mongoose.Schema;
 
var Categories ={
    name: {
        type: String,
        default: '',
        required: 'Please fill Category name',
        trim: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
}

module.exports = mongoose.model('Categories', CategoriesSchema);