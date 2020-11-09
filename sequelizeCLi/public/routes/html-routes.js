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

  app.get("/profile", function(req, res) {
      // pass object to handlebars so that this array can be passed through (giving it the name "user")
      res.render("profile")
    })
  app.get("/main", function(req,res){
    res.render("index")
  })
  
  app.get("/", isAuthenticated, function(req, res) {
    res.render("index");
  });
}