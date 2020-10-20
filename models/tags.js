const mongoose = require('mongoose');

 var tagSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    time_created: {
        type: Date,
        required: true
    },
    time_updated:{
        type: Date
    }
 });

 module.exports = Tag = mongoose.model('tag', tagSchema);