const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../util/db');

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true, // is the default behavior (so it could be omitted)
    modelName: 'user',
    defaultScope: {
      attributes: {
        exclude: ['passwordHash'], // excludes passwordHash for find operations
      },
    },
    hooks: {
      // afterCreate hook is fired after the record is persisted, so any mutations to the dataValues will only be reflected in the return
      afterCreate: (record) => {
        // removes passwordHash attribute from user for safe return
        delete record.dataValues.passwordHash;
      },
    },
  }
);

module.exports = User;
