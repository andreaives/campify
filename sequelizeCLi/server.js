// =============================================================
var express = require("express");
var exphbs = require("express-handlebars");
var passport = require("./config/passport")
var session = require("express-session");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

const handlebarsConfig = {
  defaultLayout: "main", 
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  },
}
app.engine("handlebars", exphbs(handlebarsConfig));
app.set("view engine", "handlebars");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));


//Set up sessions to keep track of logins and logouts
app.use(session({secret: "campify secret", resave: true, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())
// Routes
// =============================================================

require("./public/routes/html-routes.js")(app);
// require("./public/routes/html-routes.js")(app);
require("./public/routes/review-api-routes.js")(app);
require("./public/routes/user-api-routes.js")(app);



// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
