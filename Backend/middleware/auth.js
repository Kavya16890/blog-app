const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.cookies.token || req.header("Authorization")?.split(" ")[1];
  console.log(token)

  if (!token) {
    return res.status(401).send("access denied");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "invalid token" });
  }
};

module.exports = auth;
