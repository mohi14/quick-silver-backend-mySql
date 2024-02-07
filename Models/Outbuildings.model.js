module.exports = (sequelize, DataTypes) => {
  const OutbuildingsValue = sequelize.define("Outbuildings", {
    InsurerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    OutbuildingsList: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  });

  return OutbuildingsValue;
};
