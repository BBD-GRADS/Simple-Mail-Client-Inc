const { CognitoJwtVerifier } = require("aws-jwt-verify");
const { awsConfig } = require("../config");

const verifier = CognitoJwtVerifier.create({
  userPoolId: awsConfig.cognitoUserPoolId,
  tokenUse: "id",
  clientId: awsConfig.cognitoClientId,
});

const authenticateSession = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const payload = await verifier.verify(token);
    req.user = payload;
    next(); // Pass control to the next middleware function
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

module.exports = authenticateSession;
