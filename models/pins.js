var bcrypt = require("bcryptjs")

//this is our User model
module.exports = function (sequelize, DataTypes) {
  var Pin = sequelize.define("Pin", {

    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    }
  })


  Pin.associate = function (models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Pin.belongsTo(models.User, {
      foreignKey: {
        onDelete: "cascade"
      }
    });
  };
  return Pin;
};
