
var db = require("../../models");
var passport = require("../../config/passport")

module.exports = function(app) {
  app.get("/api/profile", function(req, res) {
    db.User.findAll({
      include: [db.Review]
    }).then(function(dbUser) {
      res.json(dbUser);
      console.log(dbUser)
    });
  });

  app.get("/api/profile/:id", function(req, res) {
    db.User.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Review]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.post("/api/profile", function(req, res) {
    db.User.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.delete("/api/profile/:id", function(req, res) {
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.post("/api/profile", function(req, res){
    db.User.update({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
      .then(function(){
        res.redirect(307, "/api/login");
      })
      .catch(function() {
        res.status(401).json(err);
      })
  })

  app.get("/api/profile_data", function(req,res) {
    if (!req.user) {
      res.json({});
    } else {
      res.json({
        email: req.user.email,
        id: req.user.id
      })
    }
  })
};
