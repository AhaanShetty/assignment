const express = require('express');
const router = express.Router();
const Tag = require('../models/tags');

var tag_error='';

router.get('/',(req,res) => {
    Tag.find({}, (err,doc) => {
        if(doc){
            res.render('tags',{ tags:doc});
        }
    });
    
});

router.get('/create',(req,res) => {
    res.render('create_tag',{tag_error:tag_error});
})

router.post('/create',(req,res) => {
    console.log(req.body);
    if(req.body.tag_title == ''){
        tag_error = "Enter a tag title";
        res.redirect('/tag/create');
        //res.render('index',{ errors:errors,tag_error: "Enter a tag title"});
    }else{
        Tag.findOne({ title: req.body.tag_title},(err,doc) => {
            if(doc){
                tag_error = "Tag already exists";
                res.redirect('/tag/create');
                //res.render('index',{ errors:errors,tag_error: "Tag already exists"});
            }else{
                var newTag = new Tag();
                newTag.title = req.body.tag_title;
                newTag.time_created = Date.now();
                newTag.save((err,doc) => {
                    if(!err) {
                        res.redirect('/tag');
                    }
                });
            }
        });
    }
});

router.get('/delete/:id',(req,res) => {
    Tag.findByIdAndRemove(req.params.id,(err,doc) => {
        if(!err)
            res.redirect('/tag');
        else
            console.log('Error in deleting tag :' + err);
    });
});

module.exports = router;