const db = require("../Models");
const { removeSensitiveInfo } = require("../utils/auth");

const PolicyHolderList = db.PolicyHolderList;
const HazardList = db.HazardList;
const AddOnList = db.AddOnList;
const MessageList = db.ListMessage;

const addPolicyHolder = async (req, res) => {
  try {
    const newData = { adminstratorId: req.user?.id, ...req.body };
    const newPolicyHolder = await PolicyHolderList.create(newData);

    return res.status(200).json({
      message: "Data added successfully!",
      success: true,
      data: newPolicyHolder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updatePolicyHolder = async (req, res) => {
  try {
    const { ...info } = req.body;

    const policyHolder = await PolicyHolderList.findOne({
      where: { id: req.params.id },
    });

    if (policyHolder) {
      await policyHolder.update(req.body);

      const updatedPolicyHolder = await PolicyHolderList.findByPk(
        req.params.id
      );
      res.status(200).json({
        success: true,
        message: "Data updated successfully",
        data: removeSensitiveInfo(updatedPolicyHolder),
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Update unsuccessful",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const addAddOnList = async (req, res) => {
  try {
    const newData = { adminstratorId: req.user?.id, ...req.body };
    const newPolicyHolder = await AddOnList.create(newData);

    return res.status(200).json({
      message: "Data added successfully!",
      success: true,
      data: removeSensitiveInfo(newPolicyHolder),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateAddOnList = async (req, res) => {
  try {
    const { ...info } = req.body;

    const addOn = await AddOnList.findOne({
      where: { id: req.params.id },
    });

    if (addOn) {
      await addOn.update(req.body);

      const updatedAddOn = await AddOnList.findByPk(req.params.id);
      res.status(200).json({
        success: true,
        message: "Data updated successfully",
        data: removeSensitiveInfo(updatedAddOn),
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Update unsuccessful",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const addHazardList = async (req, res) => {
  try {
    const newData = { adminstratorId: req.user?.id, ...req.body };
    const newHazard = await HazardList.create(newData);

    return res.status(200).json({
      message: "Data added successfully!",
      success: true,
      data: removeSensitiveInfo(newHazard),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateHazardList = async (req, res) => {
  try {
    const { ...info } = req.body;

    const hazardList = await HazardList.findOne({
      where: { id: req.params.id },
    });

    if (hazardList) {
      await hazardList.update(req.body);

      const updatedHazardList = await HazardList.findByPk(req.params.id);
      res.status(200).json({
        success: true,
        message: "Data updated successfully",
        data: removeSensitiveInfo(updatedHazardList),
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Update unsuccessful",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const addMessageList = async (req, res) => {
  try {
    const newData = { adminstratorId: req.user?.id, ...req.body };
    const newMessage = await MessageList.create(newData);

    return res.status(200).json({
      message: "Data added successfully!",
      success: true,
      data: removeSensitiveInfo(newMessage),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateMessageList = async (req, res) => {
  try {
    const messageList = await MessageList.findOne({
      where: { id: req.params.id },
    });

    if (messageList) {
      await messageList.update(req.body);

      const updatedMessageList = await MessageList.findByPk(req.params.id);
      res.status(200).json({
        success: true,
        message: "Data updated successfully",
        data: removeSensitiveInfo(updatedMessageList),
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Update unsuccessful",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addPolicyHolder,
  updatePolicyHolder,
  addAddOnList,
  updateAddOnList,
  addHazardList,
  updateHazardList,
  addMessageList,
  updateMessageList,
};
