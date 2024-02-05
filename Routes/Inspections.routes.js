const {
  addInsurance,
  addHazards,
  addProperty,
  updateHazards,
  addOutbuildings,
  getOutBuildingByEntityId,
  updateOutBuildingsData,
} = require("../Controllers/Inspections.controllers");

const { isAuth } = require("../utils/middleware");

const router = require("express").Router();

// insurance routes
router.post("/addInsurance", addInsurance);
router.get("/all", addInsurance);

//Property route
router.post("/addProperty", addProperty);
router.patch("/:id", addProperty);

// hazard routes
router.post("/addHazards", addHazards);
router.patch("/:id", updateHazards);

// outbuildings routes
router.post("/outbuilding/add", isAuth, addOutbuildings);
router.get(
  "/outbuildingsByEntityId/:entityId",
  isAuth,
  getOutBuildingByEntityId
);
router.patch("/updateOutBuildings/:entityId", isAuth, updateOutBuildingsData);

module.exports = router;
