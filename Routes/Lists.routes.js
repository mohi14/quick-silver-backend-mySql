const {
  addPolicyHolder,
  addHazardList,
  addAddOnList,
  updateAddOnList,
  updateHazardList,
  addMessageList,
  updateMessageList,
  updatePolicyHolder,
} = require("../Controllers/List.controllers");
const { isAuth } = require("../utils/middleware");

const router = require("express").Router();

// PolicyHolderList routes
router.post("/addPolicyHolder", isAuth, addPolicyHolder);
router.patch("/updatePolicyHolder/:id", isAuth, updatePolicyHolder);

//HazardList routes
router.post("/addHazardList", isAuth, addHazardList);
router.patch("/updateHazardList/:id", isAuth, updateHazardList);

// AddOn routes
router.post("/addAddOn", isAuth, addAddOnList);
router.patch("/updateAddOn/:id", isAuth, updateAddOnList);

// Message routes
router.post("/addMessage", isAuth, addMessageList);
router.patch("/updateMessage/:id", isAuth, updateMessageList);

module.exports = router;
