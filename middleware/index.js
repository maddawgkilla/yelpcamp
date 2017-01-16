// all the middleware goes here
var Campground = require("../models/campground");
var Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkCampgroundOwner = function(req, res, next) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (foundCampground.author.username === req.user.username) {
            return next();
        }
        req.flash("error", "You are not authorized to do that")
        res.redirect("back");
    });
}

middlewareObj.checkCommentOwner = function(req, res, next) {
    Comment.findById(req.params.cid, function(err, foundComment) {
        if (err) {
            console.log(err);
        } else if (foundComment.author.username === req.user.username) {
            return next();
        } else {
            req.flash("error", "You are not authorized for this action");
            res.redirect("back");
        }
    });
}

middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}

module.exports = middlewareObj;