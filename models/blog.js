const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../util/db');

class Blog extends Model {}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    year: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: [1991],
          msg: 'Year has to be 1991 or later',
        },
        max: {
          args: [new Date().getFullYear()],
          msg: `Year must be ${new Date().getFullYear()} or before`,
        },
      },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true, // is the default behavior (so it could be omitted)
    modelName: 'blog',
  }
);

module.exports = Blog;
