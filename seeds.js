var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [{
    name: "Clouds Rest",
    image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
}, {
    name: "Desert mesa",
    image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum BLAH"
}, {
    name: "Canyon Floor",
    image: "https://farm3.staticflickr.com/2535/3823437635_c712decf64.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum!!!!!!!"
}];

function seedDB() {
    // remove all campgrounds
    Campground.remove({}, function(err, removedCampgrounds) {
        // if (err) {
        //     console.log(err);
        // } else {
        //     console.log("Campgrounds removed");
        //     // add a few campground
        //     data.forEach(function(seed) {
        //         Campground.create(seed, function(err, createdCamp) {
        //             if (err) {
        //                 console.log(err);
        //             } else {
        //                 console.log("campground created");
        //                 // create a comment
        //                 Comment.create({
        //                     text: "This place is awsome but i wish they had internet",
        //                     author: "Homer"
        //                 }, function(err, comment) {
        //                     if (err) {
        //                         console.log(err);
        //                     } else {
        //                         createdCamp.comments.push(comment);
        //                         createdCamp.save();
        //                         console.log("comment created");
        //                     }
        //                 });
        //             }
        //         });
        //     });
        // }
    });
}

module.exports = seedDB;