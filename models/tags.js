const mongoose = require('mongoose');

 var tagSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    time_created: {
        type: String,
        required: true
    },
    time_updated:{
        type: String
    }
 });

 module.exports = Tag = mongoose.model('tag', tagSchema);