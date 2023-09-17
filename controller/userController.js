const UserModel = require("../Models/userModel");
const generateToken = require("../Config/generateToken");
exports.Signup = async (req, res) => {
  const { email } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) {
    return res.status(200).json({ message: "User already exist", user });
  }
  UserModel.create(req.body)
    .then((data) => {
      console.log(data);
      const token = generateToken(data._id);
      console.log(token);
      return res.status(200).json({
        id: data._id,
        name: data.name,
        password: data.password,
        token: token,
        email: data.email,
        pic: data.pic,
        message: "User created successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ message: "error occured", err });
    });
};
exports.Signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });


  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);
    return res.status(200).json({
      id: user._id,
      name: user.name,
      password: user.password,
      token: token,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      message: "Login successfully",
    });
  } else {
    return res.status(400).json({ message: "invalid email or password" });
  }
};
exports.Getusers = async (req, res) => {
  const search = req.body.search;
  const id = req.user;
  const users = await UserModel.find({
    name: { $regex: ".*" + search + ".*", $options: "i" },
  }).find({ _id: { $ne: id } });
  try {
    if (users.length > 0) {
      return res.status(200).json({ users,message:"Please see found users" });
    } else {
      return res.status(200).json({  users,message: " No user with this name" });
    }
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
