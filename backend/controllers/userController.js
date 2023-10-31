import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/UserModel.js";
import generateToken from "../utils/generateToken.js";
//  Auth user & get token
// route POST /api/users/login
//public
const authUser = asyncHandler(async (req, res) => {
  const {email, password} = req.body;

  const user = await User.findOne({email});
  if(user && (await user.matchPassword(password))){
   generateToken(res, user._id);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    })
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//  Register User
// route POST /api/users
//public
const registerUser = asyncHandler(async (req, res) => {
const {name, email, password} = req.body;
const userExists = await User.findOne({email});

if (userExists) {
  res.status(400);
  throw new Error("User already exists")
}
const user = await User.create({
  name,
  email,
  password
});
if(user) {
  generateToken(res, user._id);
  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin
})
}else { 
  res.status(400);
  throw new Error("Invalid user data");
};
});

//  Logout user & clear cokkie
// route POST /api/users/logout
//private
const logoutUser = asyncHandler(async (req, res) => {
 res.cookie("jwt", "", {
  httpOnly: true,
  expires: new Date(0),
 });
 res.status(200).json({ message: "Logged out successfully" });
});

//  get User profile
// route GET /api/users/profile
// private
const getUserProfile = asyncHandler(async (req, res) => {
  res.send("get user profile");
});

//  get User profile
// route PUT /api/users/profile
// private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("update user profile");
});

//  get Users
// route GET /api/users
// private/Admin
const getUserById = asyncHandler(async (req, res) => {
  res.send("get user by id");
});

//  get User by ID
// route GET /api/users/:id
// private/Admin
const getUsers = asyncHandler(async (req, res) => {
  res.send("get users");
});

// Delete Users
// route DELETE /api/users/:id
// private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send("delete user");
});

//  Update User
// route PUT /api/users/:ID
// private/Admin
const updateUser = asyncHandler(async (req, res) => {
  res.send("update user");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUsers,
  getUserById,
  getUserProfile,
  updateUserProfile,
  updateUser,
  deleteUser,
} 
