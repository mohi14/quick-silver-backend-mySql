module.exports = (sequelize, DataTypes) => {
  const AutomobileValue = sequelize.define("Automobile", {
    YearBuilt: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Manufacturer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Details: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    InsurerId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  AutomobileValue.associate = (models) => {
    AutomobileValue.belongsTo(models.Insurance, { foreignKey: "InsuranceId" });
  };

  return AutomobileValue;
};
