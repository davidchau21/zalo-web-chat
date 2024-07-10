const mongoose = require("mongoose");

const oneToOneMessageSchema = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  messages: [
    {
      from: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
      to: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
      type: {
        type: String,
        enum: ["Text", "Media", "Document", "Link"],
      },
      text: {
        type: String,
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

const OneToOneMessage = new mongoose.model(
  "OneToOneMessage",
  oneToOneMessageSchema
);
module.exports = OneToOneMessage;
