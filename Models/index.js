const dbConfig = require("../config/dbConfig");

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log(`Database Connection has been established successfully.`);
  })
  .catch((err) => {
    console.log("Error" + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// db.inputValue = require("./inputModel")(sequelize, DataTypes);
db.user = require("./User.model")(sequelize, DataTypes);
db.inspections = require("./Inspections.model")(sequelize, DataTypes);
db.insurance = require("./insurance.model")(sequelize, DataTypes);
db.Property = require("./Property.model")(sequelize, DataTypes);
db.Attachments = require("./Attachments.model")(sequelize, DataTypes);
db.Hazards = require("./Hazards.model")(sequelize, DataTypes);
db.Outbuildings = require("./Outbuildings.model")(sequelize, DataTypes);


db.sequelize.sync({ force: false }).then(() => {
  console.log(`Yes re-sync done!`);
});

module.exports = db;
