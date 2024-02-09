module.exports = (sequelize, DataTypes) => {
  const PropertyValue = sequelize.define("Property", {
    PropertyDetails: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    YearBuilt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    DwellingFront: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Occupied: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    HomeownerPresent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    SidingMaterial: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Stories: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    SQFeet: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    MeasuredW: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    RoofMaterial: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    RoofLayers: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Fencing: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    FenceMaterial: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    RoofCondition: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    EstAge: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Outbuilding: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    DetailedRoofAdder: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    OutbuildingAdder: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    InsurerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  // Define the association between Book and Author
  PropertyValue.associate = (models) => {
    PropertyValue.belongsTo(models.Insurance, { foreignKey: "InsuranceId" });
  };

  return PropertyValue;
};
