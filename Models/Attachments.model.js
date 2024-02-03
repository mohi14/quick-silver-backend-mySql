module.exports = (sequelize, DataTypes) => {
    const AttachmentsValue = sequelize.define("Attachments", {
        OutbuildingsList:  {
            type: DataTypes.JSON,
            allowNull: false
        },

    });

    return AttachmentsValue;
};
