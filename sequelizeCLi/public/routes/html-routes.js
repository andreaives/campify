var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/routes/.html"));
  });

  app.get("/user", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/view/layout/user-block.handlebars"));
  });

  // blog route loads blog.html
  app.get("/reviews", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/view/layout/review-block.handlebars"));
  });

};
