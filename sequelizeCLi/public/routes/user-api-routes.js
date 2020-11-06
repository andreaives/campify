
var db = require("../../models");

module.exports = function(app) {
  app.get("/api/user", function(req, res) {
    db.User.findAll({
      include: [db.Review]
    }).then(function(dbUser) {
      res.json(dbUser);
      console.log(dbUser)
    });
  });

  app.get("/api/user/:id", function(req, res) {
    db.User.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Review]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.post("/api/user", function(req, res) {
    db.User.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.delete("/api/user/:id", function(req, res) {
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.post("/api/user", function(req, res){
    db.User.update({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    },{
      where: {
        id: req.body.id
      }
    }
    ).then(function(dbUser){
      res.json(dbUser)
    })
  })
};
