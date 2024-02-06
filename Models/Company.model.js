module.exports = (sequelize, DataTypes) => {
  const CompanyValue = sequelize.define("Company", {
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    currentCredits: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    firstAddress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastAddress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    zipCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return CompanyValue;
};
