module.exports = (sequelize, DataTypes) => {
  const HazardListValue = sequelize.define("HazardList", {
    adminstratorId: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    noteVisible: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    noteRequired: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    startDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return HazardListValue;
};
