const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { sequelize } = require("./Models");
const PORT = process.env.PORT || 8000;
const path = require("path");

const app = express();

// middleware

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

sequelize
  .sync()
  .then(() => {
    console.log("Database synced");
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });

// routers

const userRoutes = require("./Routes/User.routes");

app.use("/api/user/", userRoutes);

app.use("/api/uploads", express.static(path.join(__dirname, "/")));

//  testing api
app.get("/", (req, res) => {
  res.json({ message: "hello from api" });
});

// server

app.listen(PORT, () => {
  console.log(`Server is runing on port ${PORT}`);
});
