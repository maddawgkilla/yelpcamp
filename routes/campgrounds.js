var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");



//index route
router.get("/", function(req, res) {
    // Get all campgrounds
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", { campgrounds: allCampgrounds, currentUser: req.user });
        }
    });
});

//create campground
router.post("/", middleware.isLoggedIn, function(req, res) {
    Campground.create(req.body, function(err, campground) {
        if (err) {
            console.log(err);
        } else {
            campground.author.id = req.user._id;
            campground.author.username = req.user.username;
            campground.save();
            Campground.find({}, function(err, allCampgrounds) {
                res.render("campgrounds/index", { campgrounds: allCampgrounds });
            });
        }
    });
});

//new campground form
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

// Show Route
router.get("/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", { campground: foundCampground });
        }
    });
});

//editing form for campground
router.get("/:id/edit", [middleware.isLoggedIn, middleware.checkCampgroundOwner], function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            console.log(err);
            res.redirect("/");
        } else {
            res.render("campgrounds/edit", { campground: foundCampground });
        }
    });
});

//updating the campground logic
router.put("/:id", [middleware.isLoggedIn, middleware.checkCampgroundOwner], function(req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if (err) {
            console.log(err);
            res.redirect("/");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//deleting the campground logic
router.delete("/:id", [middleware.isLoggedIn, middleware.checkCampgroundOwner], function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err, removedCampground) {
        if (err) {
            console.log(err);
            res.redirect("/");
        } else {
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;