const db = require("../Models");

const bcryptjs = require("bcryptjs");
const randomstring = require("randomstring");
const { removeSensitiveInfo } = require("../utils/auth");

const insurance = db.insurance;
const Hazards = db.Hazards;
const Property = db.Property;
const Outbuildings = db.Outbuildings;
const Attachments = db.Attachments;
const Automobile = db.Automobile;

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

// --------------------------insurance-------------------//
const addInsurance = async (req, res) => {
  try {
    const newInsurance = await insurance.create({
      ...req.body,
    });

    return res.status(200).json({
      message: "Insurance added successfully!",
      success: true,
      data: newInsurance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCompanyInsuranes = async (req, res) => {
  try {
    const allInsurance = await insurance.findAll({
      where: { companyId: req.params.companyId },
    });

    return res.status(200).json(allInsurance);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSingleInsurance = async (req, res) => {
  try {
    const singleInsurance = await insurance.findByPk(req.params.id);
    return res.status(200).json(singleInsurance);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateInsurance = async (req, res) => {
  try {
    const Insurance = await insurance.findOne({ where: { id: req.params.id } });

    if (Insurance) {
      await Insurance.update(req.body);

      const updatedInsurance = await insurance.findByPk(req.params.id);
      return res.status(200).json({
        success: true,
        message: "Insurance updated successfully",
        data: removeSensitiveInfo(updatedInsurance),
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Update unsuccessful",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSearchInsurances = async (req, res) => {
  try {
    const result = await insurance.findAll({
      where: req.query,
    });
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ---------------insurance end---------------//

// ----------------- property -------------------//

const addProperty = async (req, res) => {
  try {
    const newProperty = await Property.create({
      ...req.body,
    });

    return res.status(200).json({
      message: "New property created!",
      success: true,
      data: newProperty,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateProperty = async (req, res) => {
  try {
    const property = await Property.findOne({ where: { id: req.params.id } });

    if (property) {
      await property.update(req.body);

      const updatedProperty = await Property.findByPk(req.params.id);
      return res.status(200).json({
        success: true,
        message: "Property updated successfully",
        data: removeSensitiveInfo(updatedProperty),
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Update unsuccessful",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getPropertyInfo = async (req, res) => {
  try {
    const property = await Property.findOne({
      where: { InsurerId: req.params.insuredId },
    });

    return res.status(200).json(property);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ----------------- property end -------------------//

// ------------------- automobile-------------------//

const addAutomobile = async (req, res) => {
  try {
    const newAutomobile = await Automobile.create({
      ...req.body,
    });

    return res.status(200).json({
      message: "New automobile created!",
      success: true,
      data: newAutomobile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateAutomobile = async (req, res) => {
  try {
    const automobile = await Automobile.findOne({
      where: { id: req.params.id },
    });

    if (automobile) {
      await automobile.update(req.body);

      const updatedAutomobile = await Automobile.findByPk(req.params.id);
      return res.status(200).json({
        success: true,
        message: "Automobile updated successfully",
        data: removeSensitiveInfo(updatedAutomobile),
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Update unsuccessful",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAutomobileInfo = async (req, res) => {
  try {
    const automobile = await Automobile.findOne({
      where: { InsurerId: req.params.insuredId },
    });

    return res.status(200).json(automobile);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ------------------ automobile end -------------------//

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
  getCompanyInsuranes,
  getSingleInsurance,
  updateInsurance,
  getSearchInsurances,

  // Hazards
  addHazards,
  updateHazards,

  // Property
  addProperty,
  updateProperty,
  getPropertyInfo,

  // Automobile
  addAutomobile,
  updateAutomobile,
  getAutomobileInfo,

  // OutBuildings
  addOutbuildings,
  getOutBuildingByEntityId,
  updateOutBuildingsData,
  deleteOutBuildingsData,
};
