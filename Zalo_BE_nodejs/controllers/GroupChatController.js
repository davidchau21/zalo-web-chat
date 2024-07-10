const Firebase = require("../services/Firebase");
const GroupChat = require("../models/GroupChat");

module.exports = {
  async getOne(req, res) {
    try {
      const group = await GroupChat.findById(req.params.groupId)
      // .populate(
      //   "members",
      //   "lastName"
      // );
      .populate({
        path: "members",
        select: "firstName lastName"
      });

      if (!group) {
        res.status(500).json({ message: "Nhóm không còn tồn tại" });
      } else res.status(200).json({ message: "Tìm thấy nhóm", data: group });
    } catch (error) {
      res.status(500).json({ message: "Gặp lỗi khi tim nhóm", error });
    }
  },
  async getAll(req, res) {
    try {
      const userId = req.params.uid;
      console.log("userId", userId);
      // Tìm tất cả các nhóm mà người dùng là thành viên
      const groups = await GroupChat.find({ members: userId }).populate(
        "members",
        "lastName"
      );

      if (!groups || groups.length === 0) {
        return res
          .status(404)
          .json({ message: "Không tìm thấy nhóm cho người dùng này" });
      }
      res.status(200).json({ message: "1Tìm thấy nhóm", data: groups });
    } catch (error) {
      console.error("Lỗi khi tìm nhóm:", error);
      res.status(500).json({ message: "Gặp lỗi khi tìm nhóm", error });
    }
  },

  async addMember(req, res) {
    try {
      const group = await GroupChat.findByIdAndUpdate(
        req.body.groupId,
        { $push: { members: req.body.memberId } },
        { new: true }
      );

      res.status(200).json({ message: "Thêm vào thành công", data: group });
    } catch (error) {
      res.status(500).json({ message: "Thất bại", error: error.message });
    }
  },

  async store(req, res) {
    try {
      const { groupName, admin } = req.body;
      group = new GroupChat({
        groupName,
        admin,
        members: [admin],
        messages: [],
      });
      group.save();
      res.status(201).json({ message: "Tạo nhóm thành công" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi tạo", error: error.message });
    }
  },

  async sendMsgToGroup(req, res) {
    try {
      const { groupId, sender, type, text, file, replyToTxt, replyToId } =
        req.body;

      let group = await GroupChat.findById(groupId);

      if (group) {
        let newMessage = {
          sender,
          type,
          text,
          isRemove: false,
          file,
          replyToTxt,
          replyToId,
        };
        await Promise.all([group.messages.push(newMessage), group.save()]);
        res.status(201).json({ message: "Tin nhắn đã được lưu thành công" });
      } else {
        res.status(500).json({ message: "Nhóm không còn tồn tại" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Lỗi khi lưu tin nhắn", error: error.message });
    }
  },
  async sendMsgToGroupWithImg(req, res) {
    try {
      const { groupId, sender, type, text, replyToTxt, replyToId } = req.body;
      let url;
      if (req.file) {
        url = await Firebase.uploadImage(req.file);
        console.log(" có hình: ", url);
      }
      let group = await GroupChat.findById(groupId);

      if (group) {
        let newMessage = {
          sender,
          type,
          text,
          file: url,
          replyToTxt,
          replyToId,
        };
        await Promise.all([group.messages.push(newMessage), group.save()]);
        res.status(200).json({ message: "Tin nhắn đã được lưu thành công" });
      } else {
        res.status(500).json({ message: "Nhóm không còn tồn tại" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Lỗi khi lưu tin nhắn", error: error.message });
    }
  },
  async delete(req, res) {
    try {
      const { groupId, msgId } = req.body;

      console.log("msgid ", msgId);
      console.log("groupId ", groupId);
      await GroupChat.findOneAndUpdate(
        { _id: groupId, "messages._id": msgId },
        { $set: { "messages.$.isRemove": true } }
      );
      res.status(200).json({ message: "Xóa thành công" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Lỗi khi xóa tin nhắn", error: error.message });
    }
  },
};
