const { AuthDataBaseInstance } = require("./dataBaseInstance");

const Users = require("./Model/Oauth/User");
const Clients = require("./Model/Oauth/Clients");
const AuthTokens = require("./Model/Oauth/AuthTokens");
const AuthCodes = require("./Model/Oauth/AuthCodes");
const Rooms = require("./Model/Rtc/Rooms");

Users.hasMany(AuthTokens, {
  foreignKey: "userId",
});

AuthTokens.belongsTo(Users, {
  foreignKey: "userId",
});

Users.hasMany(AuthCodes, {
  foreignKey: "userId",
});

AuthCodes.belongsTo(Users, {
  foreignKey: "userId",
});

AuthTokens.belongsTo(AuthCodes, {
  foreignKey: "userId",
});

Clients.hasMany(AuthCodes, {
  foreignKey: "clientId",
});

AuthCodes.belongsTo(Clients, {
  foreignKey: "clientId",
});

Users.hasMany(Rooms, {
  foreignKey: "creataRoomUserId",
});

Rooms.belongsTo(Users, {
  foreignKey: "creataRoomUserId",
});

const initDataBaseModelConnect = () => {
  AuthDataBaseInstance.authenticate()
    .then(() => {
      console.log("Database connection has been established successfully.");
    })
    .catch((error) => {
      console.error("Unable to connect to the database:", error);
    });
};

module.exports = {
  initDataBaseModelConnect,
};
