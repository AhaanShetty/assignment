const express = require('express');
const router = express.Router();
const Bookmark = require('../models/bookmark');
const tags = require('../models/tags');
const Tag = require('../models/tags');

var errors='';

router.get('/',(req,res) => {
    Bookmark.find({}, (err,doc) => {
        if(doc){
            for(var i=0;i<doc.length;i++){
                doc[i].tags_list = doc[i].tags.join(',');
            } 
            res.render('bookmarks',{ bookmarks: doc});
        }
    });
});


router.get('/create',(req,res) => {
    res.render('create_bookmark',{errors:errors});
})

router.post('/create',(req,res) => {
    const body = req.body;
    console.log(body);
    if(req.body.bookmark_title.toString() == '' || req.body.bookmark_link == '' || req.body.bookmark_publisher == ''){
        errors = "All fields necessary except tags";
        res.redirect('/bookmark/create');
        //res.render('index',{errors : errors,tag_error:tag_error})
    }else{
        Bookmark.findOne({ link: req.body.bookmark_link} , (err,doc) => {
            if(err){
                console.log(err);
            }else{
                if(doc){
                    errors = "Already existing link";
                    res.redirect('/bookmark/create');
                    // res.render('index',{ errors: errors,tag_error});
                }else{
                    var newBookmark = new Bookmark();
                    newBookmark.title = req.body.bookmark_title;
                    newBookmark.link = req.body.bookmark_link;
                    var temp = Date.now();
                    newBookmark.time_created = temp;
                    newBookmark.time_updated = temp;
                    newBookmark.publisher = req.body.bookmark_publisher;
                    if(req.body.bookmark_tags != ''){
                        tags_list = req.body.bookmark_tags.split(',');
                        Tag.find({ title: { $in : tags_list}}, (err,doc)=> {
                            if(err) console.log(err);
                            else{
                                if(doc.length > 0) {
                                    var final_tags_list = [];
                                    for(var i=0;i<doc.length;i++){
                                        if(tags_list.includes(doc[i].title) == true){
                                            final_tags_list.push(doc[i].title)
                                        }
                                    }
                                    //console.log(tags_list);
                                    newBookmark.tags = final_tags_list;
                                    newBookmark.save((err,doc) => {
                                        if(!err){
                                            res.redirect('/bookmark');    
                                        }
                                    });
                                }else {
                                    errors = "No tag found";
                                    res.redirect('/bookmark/create');
                                    //res.render('index',{ errors: errors,tag_error:tag_error})
                                }
                            }
                        });
                    }else{
                        newBookmark.save((err,doc) => {
                            if(!err){
                                res.redirect('/bookmark');    
                            }
                        });
                    }
                }
            }
        });
    }   
});

router.get('/delete/:id',(req,res) => {
    Bookmark.findByIdAndRemove(req.params.id,(err,doc) => {
        if(!err)
            res.redirect('/bookmark');
        else
            console.log('Error in deleting bookmark :' + err);
    });
});

router.post('/update',(req,res) => {
    var tag_input = req.body.tag_input;
    if(tag_input == '')
        res.redirect('/bookmark');
    else{
        var bookmark_id = req.body.bookmark_id;
        tags_list = req.body.tag_input.split(',');
        Tag.find({ title: { $in : tags_list}}, (err,doc)=> {
            if(err) console.log(err);
            else{
                if(doc) {
                    var final_tags_list = [];
                    for(var i=0;i<doc.length;i++){
                        if(tags_list.includes(doc[i].title) == true){
                            final_tags_list.push(doc[i].title)
                        }
                    }
                    //Here
                    Bookmark.findByIdAndUpdate(bookmark_id,{ $set: {tags: final_tags_list, time_updated: Date.now()} },(err,doc) => {
                        if(!err){
                            res.redirect('/bookmark');
                        }
                    });
                }else {
                    res.redirect('/bookmark');
                }
            }
        });
    }
});


module.exports = router;