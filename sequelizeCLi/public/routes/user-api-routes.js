
var db = require("../../models");

module.exports = function(app) {
  app.get("/api/review", function(req, res) {
    db.User.findAll({
      include: [db.Review]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.get("/api/review/:id", function(req, res) {
    db.User.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Review]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.post("/api/review", function(req, res) {
    db.User.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.delete("/api/review/:id", function(req, res) {
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

};
