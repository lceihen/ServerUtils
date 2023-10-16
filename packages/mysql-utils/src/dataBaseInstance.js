const { Sequelize } = require("sequelize");

const {
  MysqlUserName,
  MysqlPassWord,
  MysqlDataBase,
  MysqlHost,
  log = () => {},
} = process.env;

const AuthDataBaseInstance = new Sequelize(
  MysqlDataBase,
  MysqlUserName,
  MysqlPassWord,
  {
    host: MysqlHost,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
    define: {
      timestamps: true,
    },
    dialectOptions: {
      dateStrings: true,
    },
    timezone: "+08:00",
    logging: log,
  }
);

const RtcDataBaseInstance = new Sequelize(
  MysqlDataBase,
  MysqlUserName,
  MysqlPassWord,
  {
    host: MysqlHost,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
    define: {
      timestamps: true,
    },
    dialectOptions: {
      dateStrings: true,
    },
    timezone: "+08:00",
    logging: log,
  }
);

const handleGenerateMysqlInstance = ({
  MysqlDataBase,
  MysqlUserName,
  MysqlPassWord,
  MysqlHost,
}) => {
  return new Sequelize(MysqlDataBase, MysqlUserName, MysqlPassWord, {
    host: MysqlHost,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
    define: {
      timestamps: true,
    },
    dialectOptions: {
      dateStrings: true,
    },
    timezone: "+08:00",
    logging: log,
  });
};

module.exports = {
  AuthDataBaseInstance,
  RtcDataBaseInstance,
  handleGenerateMysqlInstance,
};
