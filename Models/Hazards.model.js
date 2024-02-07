module.exports = (sequelize, DataTypes) => {
  const HazardsValue = sequelize.define("Hazards", {
    LiabilitiesHazards: {
      type: DataTypes.JSON,
      allowNull: false,
    },

    Comments: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    CommentsResident: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    InsurerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return HazardsValue;
};
