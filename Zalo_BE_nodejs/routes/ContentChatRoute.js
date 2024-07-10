const router = require("express").Router();
const ContentChatController = require("../controllers/ContentChatController");
const multer = require("../middleware/GetImgMiddleware");

// router.get("/", ContentChatController.getAll);

router.get("/conversation", ContentChatController.getOne);

// router.post("/", multer.Multer.array("image"), ContentChatController.store);
router.post("/", ContentChatController.store);
router.post(
  "/img",
  multer.Multer.single("image"),
  ContentChatController.storeWithImage
);
router.delete("/:msgId", ContentChatController.delete);
module.exports = router;
