const Firebase = require("../services/Firebase");
const OneToOneMessage = require("../models/OneToOneMessage");

module.exports = {
  async getOne(req, res) {
    try {
      const data = await OneToOneMessage.findOne({
        participants: {
          $all: [req.query.from, req.query.to],
        },
      }).populate("participants", "lastName");

      if (data != null) {
        console.log(data);
        return res.status(200).json({
          status: 200,
          message: "Get ContentChat successful!",
          data: data,
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "No data",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        status: 400,
        message: error,
      });
    }
  },

  async store(req, res) {
    try {
      const { from, to, type, text, file, replyToTxt, replyToId } = req.body;
      let chat = await OneToOneMessage.findOne({
        participants: {
          $all: [from, to],
        },
      });

      // Tạo một biến trung gian để lưu newMessage
      let newMessage;

      if (!chat) {
        const newChat = new OneToOneMessage({
          participants: [from, to],
          messages: [],
        });
        chat = await newChat.save();
      }

      newMessage = {
        to,
        from,
        type,
        text,
        file,
        replyToTxt,
        replyToId,
      };

      if (chat) {
        await Promise.all([chat.messages.push(newMessage), chat.save()]);
      }
      console.log("không hình", newMessage);

      res
        .status(201)
        .json({ message: "Tin nhắn đã được gửi thành công", newMessage });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Lỗi khi gửi tin nhắn", error: error.message });
    }
  },

  async storeWithImage(req, res) {
    try {
      const { from, to, type, text, replyToTxt } = req.body;
      let url;
      if (req.file) {
        url = await Firebase.uploadImage(req.file);
        console.log(" có hình: ", url);
      }
      let chat = await OneToOneMessage.findOne({
        participants: {
          $all: [from, to],
        },
      });

      let newMessage;

      if (!chat) {
        const newChat = new OneToOneMessage({
          participants: [from, to],
          messages: [],
        });
        chat = await newChat.save();
      }

      if (chat) {
        newMessage = {
          to,
          from,
          type,
          text,
          file: url,
          replyToTxt,
          replyToId,
        };
        await Promise.all([chat.messages.push(newMessage), chat.save()]);
      }
      console.log("có hình", newMessage);

      res.status(201).json({ message: "Tin nhắn đã được gửi thành công" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Lỗi khi gửi tin nhắn", error: error.message });
    }
  },
  async delete(req, res) {
    try {
      const msgId = req.params.msgId;
      await OneToOneMessage.findOneAndUpdate(
        {
          "messages._id": msgId,
        },
        {
          $pull: {
            messages: { _id: msgId },
          },
        },
        { multi: true }
      );
      res.status(200).json({ message: "Xóa thành công" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Lỗi khi xóa tin nhắn", error: error.message });
    }
  },
};
