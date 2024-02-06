const db = require("../Models");

const bcryptjs = require("bcryptjs");
const randomstring = require("randomstring");

const insurance = db.insurance;
const Hazards = db.Hazards;
const Property = db.Property;
const Outbuildings = db.Outbuildings;
const Attachments = db.Attachments;

const addHazards = async (req, res) => {
  try {
    const newUser = await Hazards.create({
      ...req.body,
    });

    return res.status(200).json({
      message: "We have sent you a verification code. Please check your email!",
      success: true,
      newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const addInsurance = async (req, res) => {
  try {
    const newUser = await insurance.create({
      ...req.body,
    });

    return res.status(200).json({
      message: "We have sent you a verification code. Please check your email!",
      success: true,
      newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const addProperty = async (req, res) => {
  try {
    const newUser = await Property.create({
      ...req.body,
    });

    return res.status(200).json({
      message: "We have sent you a verification code. Please check your email!",
      success: true,
      newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ------------------------------- OutBuildings----------------------------------------//

const addOutbuildings = async (req, res) => {
  try {
    const { EntityId, name, length, width, location } = req.body;

    const outbuildings = await Outbuildings.findOne({
      where: { EntityId: EntityId },
    });

    if (!outbuildings) {
      const newOutBuildings = await Outbuildings.create({
        EntityId,
        OutbuildingsList: [
          {
            name,
            length,
            width,
            location,
          },
        ],
      });

      return res.status(200).json({
        message: "Outbuildings added successfully!",
        data: newOutBuildings,
        success: true,
      });
    }

    const newOutbuildingsList = {
      name,
      length,
      width,
      location,
    };

    const data = JSON.parse(outbuildings.get().OutbuildingsList);
    data.push(newOutbuildingsList);

    outbuildings.OutbuildingsList = data;

    await outbuildings.save();

    return res.status(200).json({
      message: "Outbuildings added successfully!",
      success: true,
      data: outbuildings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getOutBuildingByEntityId = async (req, res) => {
  try {
    const outbuildings = await Outbuildings.findOne({
      where: { EntityId: req.params.entityId },
    });

    // outbuildings.forEach((outbuilding) => {
    outbuildings.OutbuildingsList = JSON.parse(outbuildings.OutbuildingsList);
    // });

    return res.status(200).json({
      message: "Outbuildings added successfully!",
      success: true,
      data: outbuildings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateOutBuildingsData = async (req, res) => {
  try {
    const { indexNum, ...info } = req.body;

    const outbuildings = await Outbuildings.findOne({
      where: { EntityId: req.params.entityId },
    });

    const data = JSON.parse(outbuildings.OutbuildingsList);

    const updatedData = data?.map((i, idx) => {
      if (idx === indexNum) {
        return { ...i, ...info };
      } else {
        return i;
      }
    });

    outbuildings.OutbuildingsList = updatedData;
    await outbuildings.save();

    return res.status(200).json({
      message: "Outbuildings updated successfully!",
      success: true,
      data: outbuildings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteOutBuildingsData = async (req, res) => {
  try {
    const { indexNum } = req.body;

    const outbuildings = await Outbuildings.findOne({
      where: { EntityId: req.params.entityId },
    });

    const data = JSON.parse(outbuildings.OutbuildingsList);

    const updatedData = data?.filter((i, idx) => idx !== indexNum);

    outbuildings.OutbuildingsList = updatedData;
    await outbuildings.save();

    return res.status(200).json({
      message: "Outbuildings deleted successfully!",
      success: true,
      data: outbuildings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ------------------------------- OutBuildings----------------------------------------//
const addAttachments = async (req, res) => {
  try {
    const { EntityId, image, uploadDate, uploadedBy, attachmentType } =
      req.body;

    const attachments = await Outbuildings.findOne({
      where: { EntityId: EntityId },
    });

    if (!attachments) {
      const newAttachments = await Outbuildings.create({
        EntityId,
        OutbuildingsList: [
          {
            name,
            length,
            width,
            location,
          },
        ],
      });

      return res.status(200).json({
        message: "Outbuildings added successfully!",
        data: newOutBuildings,
        success: true,
      });
    }

    const newOutbuildingsList = {
      name,
      length,
      width,
      location,
    };

    const data = JSON.parse(outbuildings.get().OutbuildingsList);
    data.push(newOutbuildingsList);

    outbuildings.OutbuildingsList = data;

    await outbuildings.save();

    return res.status(200).json({
      message: "Outbuildings added successfully!",
      success: true,
      data: outbuildings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ----------------------------------attachments--------------------------------------//

// ----------------------------------attachments--------------------------------------//

// update
const updateInspection = async (req, res) => {
  try {
    const { ...info } = req.body;

    const Insurance = await insurance.findOne({ where: { id: req.id } });

    const updateInfo = image ? { image, ...info } : info;

    if (user) {
      await user.update(updateInfo);

      const updatedUser = await User.findByPk(req.user.id);
      res.status(200).json({
        success: true,
        message: "User Info updated successfully",
        data: removeSensitiveInfo(updatedUser),
      });
    } else {
      res.status(201).json({
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

const updateUserInfo = async (req, res) => {
  try {
    const { ...info } = req.body;

    const user = await User.findOne({ where: { id: req.user.id } });

    const image = req.file ? req.file.path : undefined;

    const updateInfo = image ? { image, ...info } : info;

    if (user) {
      await user.update(updateInfo);

      const updatedUser = await User.findByPk(req.user.id);
      res.status(200).json({
        success: true,
        message: "User Info updated successfully",
        data: removeSensitiveInfo(updatedUser),
      });
    } else {
      res.status(201).json({
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
const updateHazards = async (req, res) => {
  try {
    const { ...info } = req.body;

    const user = await User.findOne({ where: { id: req.user.id } });

    const image = req.file ? req.file.path : undefined;

    const updateInfo = image ? { image, ...info } : info;

    if (user) {
      await user.update(updateInfo);

      const updatedUser = await User.findByPk(req.user.id);
      res.status(200).json({
        success: true,
        message: "User Info updated successfully",
        data: removeSensitiveInfo(updatedUser),
      });
    } else {
      res.status(201).json({
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
  updateUserInfo,

  //Inspection
  addInsurance,
  updateInspection,

  // Hazards
  addHazards,
  updateHazards,

  // Property
  addProperty,

  addOutbuildings,
  getOutBuildingByEntityId,
  updateOutBuildingsData,
  deleteOutBuildingsData,
};
