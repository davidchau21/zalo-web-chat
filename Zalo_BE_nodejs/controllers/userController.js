const User = require("../models/user");
const filterObj = require("../utils/filterObj");
const FriendRequest = require("../models/friendRequest");

exports.getProfile = async (req, res, next) => {
  try {
    const uid = req.query.uid;
    console.log(uid);
    const user = await User.findById(uid);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
exports.updateMe = async (req, res, next) => {
  const filteredBody = filterObj(
    req.body,
    "firstName",
    "lastName",
    "about",
    "avatar"
  );
  const userDoc = await User.findByIdAndUpdate(req.user._id, filteredBody);

  res.status(200).json({
    status: "success",
    data: userDoc,
    message: "Profile updated successfully",
  });
};

exports.getUsers = async (req, res, next) => {
  const all_users = await User.find({
    verified: true,
  }).select("firstName lastName _id");

  let id = req.query.uid;
  const current_user = await User.findOne({ _id: id });
  const remaining_users = await all_users.filter(
    (user) =>
      user._id.toString() !== id.toString() &&
      !current_user.friends.includes(user._id.toString())
  );

  res.status(200).json({
    status: "success",
    data: remaining_users,
    masagge: "Users found successfully",
  });
};

exports.getRequest = async (req, res, next) => {
  const requests = await FriendRequest.find({
    recipient: req.user._id,
  })
    .populate("sender")
    .select("_id firstName lastName");

  res.status(200).json({
    status: "success",
    data: requests,
    message: "Requests found successfully",
  });
};

exports.getFriends = async (req, res, next) => {

  try {
    const this_user = await User.findById(req.query.uid)
    .populate(
      "friends",
      "_id firstName lastName"
    );
    res.status(200).json({
      status: "success",
      data: this_user.friends,
      // data: this_user,
      message: "Friends found successfully",
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: error,
    });
  }

};
