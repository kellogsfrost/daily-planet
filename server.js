const express = require('express');
const layouts = require('express-ejs-layouts');
const fs = require('fs');

const PORT = 3000;

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(layouts);
app.use(express.static(__dirname + 'static'));

app.get("/", function(req, res){
    res.send("you hit the root route");
});

app.get("/articles", function(req, res){
    var articles = fs.readFileSync('./articles.json');
    var articleData = JSON.parse(articles);
    res.render('articles/index', {articleData});
});

app.get("/articles/new", function(req, res){
    res.render("/articles/new.ejs");
});

app.get("/articles/:id", function(req, res){
    var articles = fs.readFileSync('./articles.json');
    var articleData = JSON.parse(articles);
    var id = parseInt(req.params.id);
    res.render('articles/show', {article: articleData[id]});
});

// app.post("/articles/", function(req, res){

// })



app.listen( PORT || 3000);
 