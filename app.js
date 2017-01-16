const express = require('express');
var mongoose = require("mongoose");
var app = express();
var methodOverride = require("method-override");
app.use(methodOverride("_method"));
var passport = require("passport");
var flash = require("connect-flash");
var LocalStrategy = require("passport-local");
app.set("view engine", "ejs");
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
var User = require("./models/user");
var Campground = require("./models/campground");
var Comment = require("./models/comment")
var seedDB = require("./seeds");
var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index")
    // seedDB();

// mongoose.connect("mongodb://localhost/yelp_camp");
// mongodb://sami:sami@ds111549.mlab.com:11549/samiyelpcamp
mongoose.connect("mongodb://sami:sami@ds111549.mlab.com:11549/samiyelpcamp");

app.use(flash());

//Passport Configuration
app.use(require("express-session")({
    secret: "my secret",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Middleware to include currentUser in all routes
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//use the routes
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use(indexRoutes);

app.listen("3000", "localhost", function() {
    console.log("Server has started!");
});