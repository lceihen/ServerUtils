const Instance = require("./dataBaseInstance");

const Users = require("./Model/Oauth/User");
const Clients = require("./Model/Oauth/Clients");
const AuthTokens = require("./Model/Oauth/AuthTokens");
const AuthCodes = require("./Model/Oauth/AuthCodes");
const Rooms = require("./Model/Rtc/Rooms");

const handleInitFirstUser = async () => {
  const users = await Users.findAll();
  if (users.length === 0) {
    await Users.create({
      userName: "lceihen",
      lastName: "",
      hashedPassword:
        "f4489710d465af26530bca0835b9279f46c065b01130de888a3b8eeb83a366629283c9627246a0b1e8f904ed5bb06ec0a9f10918afd20926f24f1c7393b0609b",
      createTime: Date.now(),
      gender: "1",
      email: "",
      phone: "18148966784",
      salt: "4a413e5d05bbbcd95c4c3b3d8ea7892f",
    });
  }
};

// const handleInitFirstClient = async () => {
//   const clients = await Clients.findAll();
//   if (clients.length === 0) {
//     await Clients.create({
//       secret: "553d4e01120fe403",
//       redirectUri: "http://baidu.com",
//     });
//   }
// };

const syncDataBase = () => {
  Instance.sync()
    .then(async () => {
      await handleInitFirstUser();
      console.log("Database synced successfully.");
    })
    .catch((error) => {
      console.error("Unable to sync the database:", error);
    });
};

const clearDataBase = async () => {
  try {
    await Instance.getQueryInterface().dropAllTables();
    console.log("数据库中的所有表已清空");
  } catch (error) {
    console.error("清空数据库中的所有表时出错:", error);
  }
};

module.exports = {
  syncDataBase,
  clearDataBase,
};
