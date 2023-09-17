const jwt = require("jsonwebtoken");
const verifytoken = async (req, res, next) => {
  const token =
    req.body.token ||
    req.query.token ||
    req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(400).json({ message: "Token needed for authorization" });
  }
  try {
    const verify = jwt.verify(token, process.env.secret);
    req.user = verify.id;
    next();
  } catch (err) {
    return res.status(400).json({ err, message: "error occured" });
  }
};
module.exports = verifytoken;
