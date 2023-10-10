const { Sequelize } = require("sequelize");

module.exports = (
  options = {
    log: () => {},
  }
) => {
  const { dataBase, userName, passWord, host } = options;

  const sequelize = new Sequelize(dataBase, userName, passWord, {
    host: host,
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

  return sequelize;
};
