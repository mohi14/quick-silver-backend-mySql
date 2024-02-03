module.exports = (sequelize, DataTypes) => {
    const InsuranceValue = sequelize.define("Insurance", {
        // DueDate: {
        //     type: DataTypes.STRING,
        //     allowNull: true,
        //     // defaultValue: sequelize.literal('CURRENT_TIMESTAMP'), 
        // },

        PolicyHolder: {
            type: DataTypes.STRING,
            allowNull: true

        },
        PolicyNumber: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        InspectionType: {
            type: DataTypes.STRING,
            allowNull: true
        },
        AssignedTo: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Insured: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        CellPhone: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Address01: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Address02: {
            type: DataTypes.STRING,
            allowNull: true
        },
        City: {
            type: DataTypes.STRING,
            allowNull: true
        },
        State: {
            type: DataTypes.STRING,
            allowNull: true
        },
        ZipCode: {
            type: DataTypes.STRING,
            allowNull: true
        },
        
    });

    // Define the association between Book and Author
    InsuranceValue.associate = (models) => {
        InsuranceValue.belongsTo(models.Property, { foreignKey: 'PropertyId' });
        InsuranceValue.belongsTo(models.Hazards, { foreignKey: 'HazardsId' });
    };

    return InsuranceValue;
};
