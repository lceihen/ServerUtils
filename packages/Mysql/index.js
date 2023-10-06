const dataBaseInstance = require("./dataBaseInstance");
const { initDataBaseModelConnect } = require("./initDataBaseModelConnect");
const initDataBaseConfig = require("./dataBaseInstance");
const { syncDataBase, clearDataBase } = require("./syncDataBaseStruct");

module.exports = {
  initDataBaseModelConnect,
  initDataBaseConfig,
  syncDataBase,
  clearDataBase,
  dataBaseInstance,
};
