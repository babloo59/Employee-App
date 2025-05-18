const User = require("../models/User");

// Get all users
exports.getUser = async (req, res) => {
  try {
    const users = await User.find(); // Sequelize: findAll()

    return res.status(200).json({
      status: 200,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      status: 500,
      message: process.env.NODE_ENV === "production" ? "Internal Server Error" : error.message,
    });
  }
};
