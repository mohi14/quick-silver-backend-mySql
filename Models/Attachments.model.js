module.exports = (sequelize, DataTypes) => {
  const AttachmentsValue = sequelize.define("Attachments", {
    EntityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    AttachmentsList: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  });

  return AttachmentsValue;
};
