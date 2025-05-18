const User = require("../models/User");

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the user by ID and delete
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      status: 500,
      message: process.env.NODE_ENV === "production" ? "Internal Server Error" : error.message,
    });
  }
};