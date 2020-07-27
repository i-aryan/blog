const express = require('express')
const router = express.Router()
const path = require("path");
let Post = require('../models/post.model');

//const multer = require('multer');

/*const storage = multer.diskStorage({
    destination: "public/uploads/",
    filename: function (req, file, cb) {
        cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });*/

router.post('/addpost', (req, res) => {

    let newPost = new Post({
        post_title: req.body.post_title,
        post_content: req.body.post_content,
        post_summary: req.body.post_summary,
        post_image: req.body.post_image,
    });

    newPost.save().then(postadded => {
        res.status(200), json({ 'success': 'post added successfully' });
    }).catch(err => {
        res.status(400).send('adding post failed');
    })
});

router.post('/editpost/:id', (req, res) => {

    console.log(req.body)
    
    Post.findById(req.params.id, function (err, post) {
        if (!post)
            res.status(404).send("data is not found");
        else {
            post.post_title = req.body.post_title;
            post.post_summary=req.body.post_summary;
            post.post_content = req.body.post_content;
            post.post_image = req.body.post_image;

            post.save().then(postedited => {
                res.json('Post updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
        }
    });
});

router.delete('/deletepost/:id', (req,res) => {
    Post.findByIdAndDelete(req.params.id, function(err, post){
        if(!post)
            res.status(404).send("post not valid");
        else{
            res.status(200).send("post was deleted");
        }
    })
})


router.get('/allposts', function (req, res, next) {
    Post.find(function (err, posts) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(posts);
        }
    });

});


/*router.post('/addpost', function(req, res){
    let newPost = new Post({
        post_title: req.body.post_title,
        post_content:req.body.post_content,
    });

    newPost.save().then(postadded =>{
        res.status(200),json({'success':'post added successfully'});
    }).catch(err =>{
        res.status(400).send('adding post failed');
    })
})*/

router.get('/:id', function (req, res) {
    let id = req.params.id;
    Post.findById(id, function (err, post) {
        if (err) {
            console.log(err)
        }
        else res.json(post);
    })
})

module.exports = router;