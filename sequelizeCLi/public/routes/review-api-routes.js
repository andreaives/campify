// Requiring our models
var db = require("../../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the posts
  app.get("/api/review", function(req, res) {
    var query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }
  
    db.Review.findAll({
      where: query,
      include: [db.User]
    }).then(function(dbReview) {
      res.json(dbReview);
    });
  });

  // Get route for retrieving a single Review
  app.get("/api/review/:id", function(req, res) {
   
    db.Review.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then(function(dbReview) {
      res.json(dbReview);
    });
  });

  // POST route for saving a new review
  app.post("/api/review", function(req, res) {
    db.Review.create(req.body).then(function(dbReview) {
      res.json(dbReview);
    });
  });

  // DELETE route for deleting review
  app.delete("/api/review/:id", function(req, res) {
    db.Review.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbReview) {
      res.json(dbReview);
    });
  });

  // PUT route for updating review
  app.put("/api/review", function(req, res) {
    db.Review.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbReview) {
      res.json(dbReview);
    });
  });
};
