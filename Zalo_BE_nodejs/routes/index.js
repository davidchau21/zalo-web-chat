const router = require("express").Router();

const authRouter = require("./auth");
const userRouter = require("./user");
const ChatRoute = require("./ContentChatRoute");
const GroupChatRoute = require("./GroupChatRoute");

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/chat", ChatRoute);
router.use("/groupchat", GroupChatRoute);

module.exports = router;
