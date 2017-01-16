// ================
// Comments Route
// ================
var express = require("express");
var router = express.Router({ mergeParams: true });
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//new comment form
router.get("/new", middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", { campground: foundCampground });
        }
    });
});

//edit comment form
router.get("/:cid/edit", [middleware.isLoggedIn, middleware.checkCommentOwner], function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            Comment.findById(req.params.cid, function(err, foundComment) {
                if (err) {
                    console.log(err);
                } else {
                    res.render("comments/edit", { campground: foundCampground, comment: foundComment });
                }
            });
        }
    });
});

//edit an existing comment
router.put("/:cid/edit", [middleware.isLoggedIn, middleware.checkCommentOwner], function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            Comment.findByIdAndUpdate(req.params.cid, req.body.comment, function(err, editedComment) {
                if (err) {
                    console.log(err);
                    res.send("There was a problem updating the comment");
                } else {
                    req.flash("success", "Successfully edited comment");
                    res.redirect("/campgrounds/" + req.params.id);
                }
            });
        }
    });
});

//delete an existing conmment
router.delete("/:cid", [middleware.isLoggedIn, middleware.checkCommentOwner], function(req, res) {
    Comment.findByIdAndRemove(req.params.cid, function(err, deletedComment) {
        if (err) {
            console.log(err);
        } else {
            req.flash("success", "Comment deleted succesfully");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//create the comment
router.post("/", middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds")
        } else {
            Comment.create(req.body.comment, function(err, createdComment) {
                if (err) {
                    console.log(err);
                } else {
                    createdComment.author.username = req.user.username;
                    createdComment.author.id = req.user._id;
                    createdComment.save();
                    foundCampground.comments.push(createdComment);
                    foundCampground.save();
                    req.flash("success", "Succesfully added comment")
                    res.redirect("/campgrounds/" + foundCampground._id);
                }
            });
        }
    });
});

module.exports = router;