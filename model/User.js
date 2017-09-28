const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name_first: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    name_last: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    email: {
      type: Sequelize.TEXT,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    password_temp: {
      type: Sequelize.TEXT
    },
    confirmation: {
      type: Sequelize.TEXT
    },
    active: {
      type: Sequelize.BOOLEAN,
      defaultValue: null
    },
    created_at: {
      type: Sequelize.DATE
    },
    updated_at: {
      type: Sequelize.DATE
    },
    failed_logins: {
      type: Sequelize.INTEGER
    }
  }, {
    timestamps: true,
    underscored: true,
    freezeTableName: true
  });
}