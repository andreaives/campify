var path = require("path");
const db = require("../../models");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    res.render("index")
    // res.sendFile(path.join(__dirname, "../public/view/layout/user-block.handlebars"));
  });

  app.get("/user", function(req, res) {
    db.User.findAll().then(function(res2){
      // pass object to handlebars so that this array can be passed through (giving it the name "user")
      res.render("index", { user: res2})
    })
    // res.sendFile(path.join(__dirname, "../public/view/layout/user-block.handlebars"));
  });

  // follow cats app with rendering the right path
  // then sequelize
  app.get("/reviews", function(req, res) {
    res.render("index")
  });

};
