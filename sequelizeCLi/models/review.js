module.exports = function(sequelize, DataTypes) {
  var Review = sequelize.define("Review", {
    star: {
      type: DataTypes.INTEGER
      // ,
      // allowNull: true,
      // defaultValue: 3
    },
    title: {
      type: DataTypes.TEXT
      // ,
      // allowNull: true,
      // defaultValue: "title",
      // validate: {
      //   len: [1, 50]
      // }
    },
    body: {
      type: DataTypes.TEXT
      // ,
      // allowNull: true,
      // defaultValue: "body",
      // validate: {
      //   len: [1, 255]
      // }
    },
    privacy: {
      type: DataTypes.STRING
      // ,
      // defaultValue: "Public"
    }
  });
  Review.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Review.belongsTo(models.User, {
      foreignKey: {
        allowNull: true
      }
    });
  };
  return Review;
};