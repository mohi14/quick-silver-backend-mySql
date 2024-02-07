const {
  addInsurance,
  addHazards,
  addProperty,
  addOutbuildings,
  getOutBuildingByEntityId,
  updateOutBuildingsData,
  deleteOutBuildingsData,
  getCompanyInsuranes,
  getSingleInsurance,
  updateInsurance,
  getSearchInsurances,
  updateProperty,
  getPropertyInfo,
  addAutomobile,
  updateAutomobile,
  getAutomobileInfo,
  updateHazard,
  getHazardInfo,
  addAttactment,
  getAttacmentByInsurerId,
  updateAttactmentData,
  deleteAttactmentssData,
} = require("../Controllers/Inspections.controllers");
const { upload } = require("../config/multerConfig");

const { isAuth } = require("../utils/middleware");

const router = require("express").Router();

// insurance routes
router.post("/addInsurance", isAuth, addInsurance);
router.get("/searchInsurance", isAuth, getSearchInsurances);
router.get("/insurance/:companyId", isAuth, getCompanyInsuranes);
router.get("/singleInsurance/:id", isAuth, getSingleInsurance);
router.patch("/updateInsurance/:id", isAuth, updateInsurance);

//Property routes
router.post("/addProperty", isAuth, addProperty);
router.get("/propertyInfo/:insuredId", isAuth, getPropertyInfo);
router.patch("/updateProperty/:id", isAuth, updateProperty);

// Automobile routes
router.post("/addAutomobile", isAuth, addAutomobile);
router.get("/automobileInfo/:insuredId", isAuth, getAutomobileInfo);
router.patch("/updateAutomobile/:id", isAuth, updateAutomobile);

// hazard routes
router.post("/addHazards", addHazards);
router.get("/hazardInfo/:insuredId", isAuth, getHazardInfo);
router.patch("/updateAutomobile/:id", updateHazard);

// outbuildings routes
router.post("/outbuilding/add", isAuth, addOutbuildings);
router.get(
  "/outbuildingsByEntityId/:InsurerId",
  isAuth,
  getOutBuildingByEntityId
);
router.patch("/updateOutBuildings/:InsurerId", isAuth, updateOutBuildingsData);
router.delete("/deleteOutBuildings/:InsurerId", isAuth, deleteOutBuildingsData);

// attactments routes
router.post("/attacment/add", isAuth, upload.single("image"), addAttactment);
router.get("/attacmentsByEntityId/:InsurerId", isAuth, getAttacmentByInsurerId);
router.patch(
  "/updateAttacments/:InsurerId",
  isAuth,
  upload.single("image"),
  updateAttactmentData
);
router.delete("/deleteAttacments/:InsurerId", isAuth, deleteAttactmentssData);

module.exports = router;
