const mongoose = require("mongoose");

const groupChatSchema = new mongoose.Schema({
  groupName: {
    type: String,
    required: true,
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  messages: [
    {
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      type: {
        type: String,
        enum: ["Text", "Media", "Document", "Link"],
      },
      text: {
        type: String,
      },
      isRemove: {
        type: Boolean,
      },
      file: {
        type: String,
      },
      replyToTxt: {
        type: String,
      },
      replyToId: {
        type: String,
      },
      created_at: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
});

const GroupChat = mongoose.model("GroupChat", groupChatSchema);

module.exports = GroupChat;
