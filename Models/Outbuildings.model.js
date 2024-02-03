module.exports = (sequelize, DataTypes) => {
    const OutbuildingsValue = sequelize.define("Outbuildings", {
        OutbuildingsList:  {
            type: DataTypes.JSON,
            allowNull: false
        },

    });

    return OutbuildingsValue;
};
