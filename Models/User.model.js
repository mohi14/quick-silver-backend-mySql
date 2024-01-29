const bcryptjs = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const UserValue = sequelize.define(
    "User",
    {
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

  UserValue.prototype.comparePassword = async function (password) {
    return await bcryptjs.compare(password, this.password);
  };

  return UserValue;
};
