// =============================================================
var express = require("express");
var exphbs = require("express-handlebars");
var passport = require("./config/passport")
var session = require("express-session");

// Sets up the Express App
// =============================================================
var app = express();

// Requiring our models for syncing
var db = require("./models");

// const handlebarsConfig = {
//   defaultLayout: "main", 
//   runtimeOptions: {
//     allowProtoPropertiesByDefault: true,
//     allowProtoMethodsByDefault: true
//   },
// }

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static(__dirname + "/public"));


//Handlebar setting
app.set("view engine", "handlebars");
app.engine("handlebars", exphbs({
  extname : 'handlebars',
  defaultLayout: 'main',
  layoutsDir: __dirname + "/views/layouts",
  partialsDir: __dirname + '/views/partials'
}));

var PORT = process.env.PORT || 8080;
// app.listen(PORT)
console.log(`http://localhost:${PORT}`)



//Set up sessions to keep track of logins and logouts
app.use(session({secret: "campify secret", resave: true, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())
// Routes
// =============================================================

require("./public/routes/html-routes.js")(app);
// require("./public/routes/html-routes.js")(app);
// require("./public/routes/review-api-routes.js")(app);
require("./public/routes/user-api-routes.js")(app);



// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

app.get("/", (req, res)=>{
  res.render("index")
})
