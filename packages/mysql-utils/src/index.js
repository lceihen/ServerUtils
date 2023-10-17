const initDataBaseModelConnect = require("./initDataBaseModelConnect");
const dataBaseInstanceModule = require("./dataBaseInstance");
const syncDataBaseStruct = require("./syncDataBaseStruct");

const AuthTokensModel = require("./Model/Oauth/AuthTokens");
const UsersModel = require("./Model/Oauth/User");
const ClientsModel = require("./Model/Oauth/Clients");
const AuthCodesModel = require("./Model/Oauth/AuthCodes");

const RtcRoomsModel = require("./Model/Rtc/Rooms");

const SequelizeModel = {
  AuthTokensModel,
  UsersModel,
  ClientsModel,
  AuthCodesModel,
  RtcRoomsModel,
};

module.exports = {
  ...initDataBaseModelConnect,
  ...dataBaseInstanceModule,
  ...syncDataBaseStruct,
  ...SequelizeModel,
};

console.log(1);
