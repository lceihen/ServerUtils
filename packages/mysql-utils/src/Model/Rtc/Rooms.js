const { DataTypes } = require("sequelize");
const { RtcDataBaseInstance } = require("../../dataBaseInstance");
const Rooms = RtcDataBaseInstance.define("Rooms", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  roomName: {
    type: DataTypes.STRING,
  },
  roomType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  roomTalkId: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  creataRoomUserId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  anchorRoomUserId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  expires: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

module.exports = Rooms;
