module.exports = (sequelize, DataTypes) => {
  const OutbuildingsValue = sequelize.define("Outbuildings", {
    EntityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    OutbuildingsList: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  });

  return OutbuildingsValue;
};
