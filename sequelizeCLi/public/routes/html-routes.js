var path = require("path");
const db = require("../../models");

var isAuthenticated = require("../../config/middleware/isAuthenticated")
// Routes
// =============================================================
module.exports = function (app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function (req, res) {
    if (req.user) {
      res.redirect("/main")
    }else{
      res.render("login")
    }
    // res.sendFile(path.join(__dirname, "../public/view/layout/user-block.handlebars"));
  });

  app.get("/profile", function (req, res) {
    db.User.findAll().then(function (res2) {
      // pass object to handlebars so that this array can be passed through (giving it the name "user")
      res.render("profile", { user: res2 })
    })
    // res.sendFile(path.join(__dirname, "../public/view/layout/user-block.handlebars"));
  });

//dont need an review route because reviews is in a modal under index (main page)
  // app.get("/reviews", function (req, res) {
  //   res.render("index")
  // });

  app.get("/main", function (req, res) {
  res.render("index")
  })

  //this is the route path to the Profile page
  // app.get("/profile", function (req, res) {
  //   res.render("profile")
  // })
  

}
