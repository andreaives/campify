var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  app.get("/api/users", function(req, res) {
    db.User.findAll({}).then(function(req,res){
      res.json(dbUser)
    })
  });

  app.post("/api/users", function(req, res) {
    db.User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password
    }).then(function(dbUser){
      res.json(dbUser)
    })
  });

  app.delete("/api/users/:id", function(req, res) {
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser){
      res.json(dbUser)
    })
  });

  // update username and password
  app.put("/api/users", function(req, res) {
    db.User.update({
      // first_name: req.body.first_name,
      // last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password
    },{
      where: {
        id: req.body.id
      }
    }).then(function(dbUser){
      res.json(dbUser)
    })
  });
};