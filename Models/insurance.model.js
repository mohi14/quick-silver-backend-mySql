module.exports = (sequelize, DataTypes) => {
  const InsuranceValue = sequelize.define("Insurance", {
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
    PolicyHolder: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    PolicyNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1, 12],
      },
    },
    InspectionType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    AssignedTo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Insured: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1, 45],
      },
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },
    CellPhone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Address01: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Address02: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    City: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    State: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ZipCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Type: {
      type: DataTypes.ENUM("Property", "Automobile"),
      allowNull: true,
    },
    Status: {
      type: DataTypes.ENUM("assigned", "unassigned"),
      allowNull: true,
      defaultValue: "assigned",
    },
  });

  // Define the association between Book and Author
  InsuranceValue.associate = (models) => {
    InsuranceValue.belongsTo(models.Property, { foreignKey: "PropertyId" });
    InsuranceValue.belongsTo(models.Hazards, { foreignKey: "HazardsId" });
  };

  return InsuranceValue;
};
