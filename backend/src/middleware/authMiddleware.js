const config = require("../config");
//PLACEHOLDER

const authenticateSession = async (req, res, next) => {
  try {
    next(); // Pass control to the next middleware function
  } catch (error) {
    console.error("Error verifying session token:", error);
    return res
      .status(403)
      .json({ message: "Invalid or expired session token." });
  }
};

module.exports = authenticateSession;
