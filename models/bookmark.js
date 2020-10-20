const mongoose = require('mongoose');

 var bookmarkSchema = new mongoose.Schema({
    link:{
        type: String,
        required: true
    },
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
    },
    publisher:{
        type: String,
        required: true
    },
    tags:{
        type: Array
    }
 });

 module.exports = Bookmark = mongoose.model('bookmark', bookmarkSchema);