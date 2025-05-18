const User = require("../models/User");

// Update user
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, title, department, role } = req.body;

    // Find the user by ID and update
    const updatedUser = await User.findByIdAndUpdate(
      id,
    { 
        name,
        email,
        title, 
        department, 
        role,
        image: `https://api.dicebear.com/5.x/initials/svg?seed=${name}`,
    },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      status: 500,
      message:
        process.env.NODE_ENV === "production"
          ? "Internal Server Error"
          : error.message,
    });
  }
};