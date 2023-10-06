const express = require("express");// requiring express using this
const app = express(); //assigning app to express
const port = 8080; //port number assign
const path = require("path");
const {v4: uuidv4} =    require('uuid');
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true}));
app.use(methodOverride('_method'));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id: uuidv4(),
        username: "Hussain21",
        content: "i really dont like coding but doing"
    },
    {
        id: uuidv4(),
        username: "Ayesha",
        content: "I am a BARBIE Girl!!!!!!"
    }
]

app.get("/posts",(req, res)=>{
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("create.ejs");
});

app.post("/posts",(req,res)=>{
    let {username , content} = req.body;
    let id = uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
});
app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let tweet = posts.find((p)=> id === p.id);
    // console.log(tweet.id);
    res.render("show.ejs",{tweet});
});
app.patch("/posts/:id", (req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let tweet = posts.find((p)=> id === p.id);
    tweet.content = newContent;
    console.log(tweet);
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let tweet = posts.find((p)=> id === p.id);
    res.render("edit.ejs",{tweet});
})
app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=> id !== p.id);
    res.redirect("/posts");
})
app.listen(port, ()=>{
    console.log("listening to port number 8080");
});