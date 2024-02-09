module.exports = (sequelize, DataTypes) => {
  const ReferalValue = sequelize.define("Referal", {
    referralId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    companyId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    referedFirstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    referedLastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    referedEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    referedPhoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    referedRole: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return ReferalValue;
};
