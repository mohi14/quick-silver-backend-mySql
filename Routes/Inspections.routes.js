const {
  addInsurance, addHazards, addProperty,
  updateHazards,
} = require("../Controllers/Inspections.controllers");
// const { upload } = require("../config/multerConfig");
const { isAuth } = require("../utils/middleware");

const router = require("express").Router();


// insurance routes
router.post("/addInsurance",  addInsurance);
router.get("/all", addInsurance); 

//Property route
router.post("/addProperty",  addProperty);
router.patch("/:id",  addProperty);


// hazard routes
router.post("/addHazards", addHazards);
router.patch("/:id",  updateHazards);

module.exports = router;
