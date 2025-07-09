const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY; // Keep it safe.

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "No token provided" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({msg: "Invalid or expired token"});
    }

    req.user = decoded;
    next()
  });
}

module.exports = verifyToken;