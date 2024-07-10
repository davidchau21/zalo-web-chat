const router = require("express").Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

router.get(
  "/profile",
  // authController.protect,
  userController.getProfile
);
router.patch(
  "/update-me",
  //  authController.protect,
  userController.updateMe
);
router.get(
  "/get-users",
  // authController.protect,
  userController.getUsers
);
router.get(
  "/get-friend-requests",
  // authController.protect,
  userController.getRequest
);
router.get(
  "/get-friends",
  // authController.protect,
  userController.getFriends
);

module.exports = router;
