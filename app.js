var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

// app config
var app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost/blog_app");

// mongoose model config
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

// // test blog post
// Blog.create({
//     title: "Test Blog",
//     image: "https://images.unsplash.com/photo-1491484925566-336b202157a5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e310d9d31bd5c72f6be9f0e153ee173d&auto=format&fit=crop&w=500&q=60",
//     body: "Hello, this is a test blog post"
// });

// routes
app.get("/", function(req, res){
    res.redirect("/blogs");
});

// INDEX ROUTE
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log("ERROR!");
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});

// NEW ROUTE
app.get("/blogs/new", function(req, res){
    res.render("new");
});

// CREATE ROUTE
app.post("/blogs", function(req, res){
    // create blog
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("new");
        } else {
            res.redirect("/blogs")
        }
    });
    // redirect to blogroll
});



app.listen(3000,function(){
    console.log("The server is running.")
});
