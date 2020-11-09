var path = require("path");
const db = require("../../models");
var express = require("express")

var isAuthenticated = require("../../config/middleware/isAuthenticated")
// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.
  app.get("/", function(req, res) {
    res.render("login")
    // res.sendFile(path.join(__dirname, "../public/view/layout/user-block.handlebars"));
  });

  app.get("/signup", function(req, res) {
    res.render("signup")
    // res.sendFile(path.join(__dirname, "../public/view/layout/user-block.handlebars"));
  });

  app.get("/profile/:id", function(req, res) {
    db.User.findAll({
    }).then(function(dbUser) {
      let data = dbUser[0].dataValues
      let arr = []
      arr.push(data)
      console.log(data)
      res.render("profile",{ user: arr});
      console.log(dbUser)
    });
      // pass object to handlebars so that this array can be passed through (giving it the name "user")
    })

    
  app.get("/main", function(req,res){
    res.render("index")
  })
  app.get("/main/search", function(req,res){
    res.render("index")
  })

  app.get("/", isAuthenticated, function(req, res) {
    res.render("index");
  });
}