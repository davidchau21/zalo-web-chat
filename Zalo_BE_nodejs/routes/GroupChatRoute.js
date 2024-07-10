const router = require("express").Router();
const GroupChatController = require("../controllers/GroupChatController");
const multer = require("../middleware/GetImgMiddleware");

router.get("/conversation/:groupId", GroupChatController.getOne);
router.get("/:uid", GroupChatController.getAll);

// router.post("/", multer.Multer.array("image"), GroupChatController.store);
router.post("/", GroupChatController.store); //tạo nhóm
router.post("/sendMsg", GroupChatController.sendMsgToGroup); //gửi tin nhắn text
router.post(
  //gửi tin nhắn có hình
  "/img",
  multer.Multer.single("image"),
  GroupChatController.sendMsgToGroupWithImg
);
router.put("/", GroupChatController.addMember); //them thanh vien
router.put("/remove", GroupChatController.delete); //xóa tin nhắn

module.exports = router;
