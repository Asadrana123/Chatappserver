import jwt from "jsonwebtoken"; // Ensure you have the correct import for jwt

const verifyToken = async (req, res, next) => {
  const token =
    req.body.token ||
    req.query.token ||
    (req.headers.authorization && req.headers.authorization.split(" ")[1]);

  if (!token) {
    return res.status(400).json({ message: "Token needed for authorization" });
  }

  try {
    const verified = jwt.verify(token, process.env.secret);
    req.user = verified.id; // Assuming verified contains the user's id
    next();
  } catch (err) {
    return res.status(400).json({ err, message: "Error occurred" });
  }
};

export default verifyToken;
