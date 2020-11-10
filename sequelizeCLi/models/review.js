module.exports = function(sequelize, DataTypes) {
  var Review = sequelize.define("Review", {
    star: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 3
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1, 50]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1, 255]
      }
    },
    privacy: {
      type: DataTypes.STRING,
      defaultValue: "Public"
    },
    UserId: {
      type: DataTypes.INTEGER
    }
  });
  Review.associate = function(models) {
    Review.belongsTo(models.User, {
      foreignKey: {
        allowNull: true
      }
    });
  };
  return Review;
};