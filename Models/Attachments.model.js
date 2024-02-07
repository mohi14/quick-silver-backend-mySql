module.exports = (sequelize, DataTypes) => {
  const AttachmentsValue = sequelize.define("Attachments", {
    InsurerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    AttachmentsList: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  });

  return AttachmentsValue;
};
