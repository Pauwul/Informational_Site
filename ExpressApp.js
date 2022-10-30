// Express implementation

const express = require("express");

// express app
const app = express();


// register view engine

app.set('view engine', 'ejs'); // defaults to views folder
// alternatively, for custome view folder:
// app.set('views', 'myviews');


// this returns an instance of  the server,
// could be useful for web sockets

app.listen(3000);

app.get("/", (req, res) => {
  //the express way

  // this also sets the content type header
  //res.send("<p> home page </p>");

  //res.sendFile("./views/index.html", { root: __dirname });

  // for ejs
  const blogs = [
    {title: "Mario runs over Yoshi with his Toyota ", snippet:""},
    {title:"Yoda's Ketamine Addiction", snippet:"Yoda is high on Ketamine and needs your donations to fund his addiction"},
    {title:"Terry the Fat Shark is back", snippet:"This week, Terryhas brought everyone a very plush thermal pillow!  This pillow is not only durable, but also always stays cold on both sides! Terry knows some people can't sleep very easily, or just hate turning pillows over to keep cool, so Terry hopes everyone can use this gift from now on to sleep comfortably whenver they want. Terry will be back wuth another gift next Wednesday"}
  ]
  res.render("index", {title: 'Home', blogs})


  /* the nodejs way
    res.setHeader('Content-Type', 'text/html')
    res.statusCode // it can do that automaticaly
    res.write()
    res.end()
    */
});

app.get("/about", (req, res) => {
  // res.send("<p>Heloo, this is about page</p>");

  // res.sendFile("/views/about.html", { root: __dirname });
  res.render('about',{title:'About'})
});

app.get('/blogs/create', (req,res)=>{
  res.render("create", { title: 'Create a new blog'})
}) 

// 404

app.use((req, res) => {
  // res.sendFile("./views/404.html", { root: __dirname });
  res.status(404)
  res.render('404', {title : '404'})
  
});
