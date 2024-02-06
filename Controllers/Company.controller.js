const { Sequelize } = require("sequelize");
const db = require("../Models");
const { removeSensitiveInfo } = require("../utils/auth");

const Company = db.Company;
const User = db.user;

const createCompany = async (req, res) => {
  try {
    const { companyName } = req.body;

    const existingCompany = await Company.findOne({
      where: { companyName: companyName },
    });

    if (existingCompany) {
      return res.status(403).json({
        message: `${companyName} already taken! Try another name.`,
        success: false,
      });
    } else {
      const newCompany = await Company.create({ companyName });
      return res.status(200).json({
        message: "Company created successfully",
        success: true,
        data: newCompany,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateCompanyInfo = async (req, res) => {
  try {
    const { ...info } = req.body;

    const company = await Company.findOne({ where: { id: req.params.id } });

    const logo = req.file ? req.file.path : undefined;

    const updateInfo = logo ? { logo, ...info } : info;

    if (company) {
      await company.update(updateInfo);

      const updatedCompany = await Company.findByPk(req.params.id);
      return res.status(200).json({
        success: true,
        message: "Company Info updated successfully",
        data: removeSensitiveInfo(updatedCompany),
      });
    } else {
      return res.status(201).json({
        success: false,
        message: "Company not found!",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCompanyInfo = async (req, res) => {
  try {
    const company = await Company.findByPk(req.params.id);
    const companyUsers = await User.findAll({
      where: { companyId: req.params.id },
    });
    const data = {
      companyInfo: company,
      companyUsers,
    };
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.findAll();
    return res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findByPk(req.params.id);
    if (!company) {
      return res
        .status(404)
        .json({ message: "Company not found", success: false });
    }

    await User.update(
      { isDeleted: true },
      { where: { companyId: req.params.id } }
    );

    await Company.destroy({
      where: { id: req.params.id },
    });

    return res.status(200).json({
      message: "Company and associated users deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error deleting company and associated users:", error);

    return res.status(500).json({ message: error.message, success: false });
  }
};

module.exports = {
  createCompany,
  updateCompanyInfo,
  getCompanyInfo,
  getAllCompanies,
  deleteCompany,
};
