const User = require("../models/User");
const asyncHandler = require("express-async-handler");

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").lean();

  if (!users?.length) {
    return res.status(400).json({ message: "No users found" });
  }

  res.json(users);
});

const login = asyncHandler(async (req, res) => {
  const { username  } = req.body;

  if (!username ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const foundUser = await User.findOne({ username }).exec();

  if (foundUser) {
    return res.status(200).json({ message: "G" });
  }else{
    const userObject = { username };
    const user = await User.create(userObject);
    if (user) {
      res.status(201).json({ message: `New user ${username} created` });
    }else{
      res.status(400).json({ message: "nie zarejestrowano essa" });
    }
  }
  
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "User ID required" });
  }

  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "user not found" });
  }

  const result = await user.deleteOne();

  const reply = `user '${result.username}' with ID ${result._id} deleted`;

  res.json(reply);
});

module.exports = {
  login,
  getAllUsers,
  deleteUser,
};
