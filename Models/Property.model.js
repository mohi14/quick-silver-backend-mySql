module.exports = (sequelize, DataTypes) => {
    const PropertyValue = sequelize.define("Property", {
        PropertyDetails: {
            type: DataTypes.STRING,
            allowNull: false
        },
        YearBuilt: {
            type: DataTypes.STRING,
            allowNull: false

        },
        DwellingFront: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Occupied: {
            type: DataTypes.STRING,
            allowNull: false
        },
        HomeownerPresent: {
            type: DataTypes.STRING,
            allowNull: false
        },
        SidingMaterial: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Stories: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        SQFeet: {
            type: DataTypes.STRING,
            allowNull: false
        },
        MeasuredW: {
            type: DataTypes.STRING,
            allowNull: false
        },
        RoofMaterial: {
            type: DataTypes.STRING,
            allowNull: true
        },
        RoofLayers: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Fencing: {
            type: DataTypes.STRING,
            allowNull: false
        },
        FenceMaterial: {
            type: DataTypes.STRING,
            allowNull: false
        },
        RoofCondition: {
            type: DataTypes.STRING,
            allowNull: false
        },
        EstAge: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Outbuilding: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Number: {
            type: DataTypes.STRING,
            allowNull: false
        },
        DetailedRoofAdder: {
            type: DataTypes.STRING,
            allowNull: false
        },
        OutbuildingAdder: {
            type: DataTypes.STRING,
            allowNull: false
        },
        InsurerId: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });

    // Define the association between Book and Author
    PropertyValue.associate = (models) => {
        PropertyValue.belongsTo(models.Insurance, { foreignKey: 'InsuranceId' });
    };


    return PropertyValue;
};
