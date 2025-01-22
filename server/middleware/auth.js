const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    // Check if the Authorization header is present
    if (!req.headers.authorization) {
      return res.status(401).send("Authorization header is missing");
    }

    // Split the token from the "Bearer <token>" format
    const token = req.headers.authorization.split(" ")[1];

    // Verify the token
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!verifyToken) {
      return res.status(401).send("Invalid token");
    }

    // Save the userId in req.locals for later use
    req.locals = verifyToken.userId;

    // Proceed to the next middleware/route handler
    next();
  } catch (error) {
    console.error("Authentication error: ", error);
    return res.status(401).send("Authentication failed");
  }
};

module.exports = auth;
