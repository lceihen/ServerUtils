const { DataTypes } = require("sequelize");

const { AuthDataBaseInstance } = require("../../dataBaseInstance");

const AuthTokens = AuthDataBaseInstance.define("AuthTokens", {
  id: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  clientId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.STRING,
  },
  expires: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = AuthTokens;
