const express = require("express");
const cors = require("cors");
const { sequelize } = require("./Models");
const PORT = process.env.PORT || 8080;

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

// const productRoutes = require("./Routes/productRoutes");
// const reviewRoutes = require("./Routes/productRoutes");

// app.use("/api/products/", productRoutes);
// app.use("api/reviews/", reviewRoutes);

//  testing api
app.get("/", (req, res) => {
  res.json({ message: "hello from api" });
});

// port

// server

app.listen(PORT, () => {
  console.log(`Server is runing on port ${PORT}`);
});
