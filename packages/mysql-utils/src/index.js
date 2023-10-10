const initDataBaseModelConnect = require("./initDataBaseModelConnect");
const dataBaseInstance = require("./dataBaseInstance");
const syncDataBaseStruct = require("./syncDataBaseStruct");

module.exports = {
  ...initDataBaseModelConnect,
  dataBaseInstance,
  ...syncDataBaseStruct,
};
