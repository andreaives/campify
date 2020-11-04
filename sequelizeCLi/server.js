const db = require("./models");

db.sequelize.sync().then(function(){  
 app.listen(PORT, function(){    
  console.log("APP listening on PORT "+ PORT)  
 });});