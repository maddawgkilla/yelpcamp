var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");


//root route
router.get("/", function(req, res) {
    res.render("landing");
});

//==================
// AUTH ROUTES
//==================

// Show register logic
router.get("/register", function(req, res) {
    res.render("register");
});

//handle sign up logic
router.post("/register", function(req, res) {
    User.register(new User({ username: req.body.username }), req.body.password, function(err, createdUser) {
        if (err) {
            console.log(err);
            req.flash("error", err.message)
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function() {
            req.flash("success", "Welcome to YelpCamp" + createdUser.username);
            res.redirect("/campgrounds");
        });
    });
});

//Show Login Form
router.get("/login", function(req, res) {
    res.render("login");
});

//Handling Login Logic
router.post("/login", passport.authenticate("local", { successRedirect: "/campgrounds", failureRedirect: "/login" }), function(req, res) {});

//Logout Logic
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged you Out");
    res.redirect("/campgrounds");
});

module.exports = router;