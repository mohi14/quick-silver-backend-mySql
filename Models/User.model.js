const bcryptjs = require("bcryptjs");
const Company = require("./Company.model");

module.exports = (sequelize, DataTypes) => {
  const UserValue = sequelize.define(
    "User",
    {
      referralId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      companyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // references: {
        //   model: "companies",
        //   key: "id",
        // },
      },
      userRole: {
        type: DataTypes.ENUM(
          "ROOT",
          "ADMINISTRATOR",
          "OFFICE ADMIN",
          "CSR",
          "FIELD ADJUSTER"
        ),
        allowNull: false,
        defaultValue: "ADMINISTRATOR",
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      otp: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: "Please enter an email address",
          },
          isEmail: {
            msg: "Please enter a valid email address",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter a password",
          },
          len: {
            args: [6, 255],
            msg: "Password must be at least 6 characters long",
          },
        },
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        default: false,
      },
    },
    {
      hooks: {
        beforeCreate: async (user) => {
          const hashedPassword = await bcryptjs.hash(user.password, 10);
          user.password = hashedPassword;
        },
      },
    }
  );

  UserValue.associate = (models) => {
    UserValue.hasOne(Company, { foreignKey: "companyId" });
  };

  return UserValue;
};
