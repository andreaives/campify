var bcrypt = require("bcryptjs")

//this is our User model
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    //email cannot be null, and is checked for being a real email
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    //password just cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })
  //this checks if the unhashed password can be checked against the stored password
  User.prototype.validPassword = function(password) {
    return bcrypt.compaseSync(password, this.password)
  }

  User.addHook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null)
  })


  User.associate = function(models) {
  // We're saying that a Post should belong to an Author
  // A Post can't be created without an Author due to the foreign key constraint
    User.hasMany(models.Review, {
        foreignKey: {
         onDelete: "cascade"
        }
      });
    };
  return User;
};
