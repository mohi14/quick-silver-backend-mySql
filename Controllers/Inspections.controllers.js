const db = require("../Models");

const bcryptjs = require("bcryptjs");
const randomstring = require("randomstring");

const insurance = db.insurance;
const Hazards = db.Hazards;
const Property = db.Property;

const addHazards = async (req,res) => {
  try {
      const newUser = await Hazards.create({
        ...req.body
      });

      return res.status(200).json({
        message:
          "We have sent you a verification code. Please check your email!",
        success: true,
        newUser
      });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
const addInsurance = async (req,res) => {
  try {
      const newUser = await insurance.create({
        ...req.body
      });

      return res.status(200).json({
        message:
          "We have sent you a verification code. Please check your email!",
        success: true,
        newUser
      });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
const addProperty = async (req,res) => {
  try {
      const newUser = await Property.create({
        ...req.body
      });

      return res.status(200).json({
        message:
          "We have sent you a verification code. Please check your email!",
        success: true,
        newUser
      });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}


// update
const updateInspection = async (req,res) => {
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
}

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

};
