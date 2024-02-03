const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  const InspectionsValue = sequelize.define("Inspections", {

    user: {
      type: DataTypes.JSON,
      allowNull: false
    }

    
  });

  return InspectionsValue;
};
