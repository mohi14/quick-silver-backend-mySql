module.exports = (sequelize, DataTypes) => {
  const MessageListValue = sequelize.define("MessageList", {
    adminstratorId: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return MessageListValue;
};
