const mongoose = require("mongoose");
const dotenv = require("dotenv");
const route = require("./routes/index");
dotenv.config({ path: "./config.env" });
const jwt = require("jsonwebtoken");
const intersection = require("./utils/intersection");
const path = require("path");

const { Server } = require("socket.io");

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});
const app = require("./app");
const http = require("http");
const User = require("./models/user");
const OneToOneMessage = require("./models/OneToOneMessage");
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.get("/", function (req, res) {
  res.set("Content-Type", "text/html; charset=utf-8");
  res.send("<h1>SRC ne</h1>");
});

app.use("/", route);

const DB = process.env.DBURI.replace("<PASSWORD>", process.env.DBPASSWORD);

mongoose
  .connect(DB, {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    // useUnifiedTopology: true,
  })
  .then((con) => {
    console.log("DB connection successful");
  });

const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

let loggedInUsers = [];

io.on("connection", async (socket) => {
  console.log(JSON.stringify(socket.handshake.query));
  const user_id = socket.handshake.query["user_id"];

  console.log(`User connected ${socket.id}`);
  if (user_id != null && Boolean(user_id)) {
    try {
      await User.findByIdAndUpdate(user_id, {
        socket_id: socket.id,
        status: "online",
      });
    } catch (e) {
      console.log(e);
    }
  }

  //login
  socket.on("login", (data) => {
    const user = { user_id: data?.user_id, socket_id: socket.id };
    const foundElement = loggedInUsers.find(
      (element) =>
        element.user_id === user.user_id && element.socket_id === user.socket_id
    );
    if (!foundElement) {
      loggedInUsers.push(user);
    }
    console.log("loggedInUsers ", loggedInUsers);
  });

  //chat 1-1
  socket.on("client-sent-message", (data) => {
    for (const value of loggedInUsers) {
      if (
        value.user_id === data.to && //to là id của thằng đc nhận msg
        io.of("/").sockets.has(value.socket_id)
      ) {
        io.to(value.socket_id).emit("server-send-message", data);
      }
    }
  });

  //tao room
  socket.on("create-group-chat", (data) => {
    socket.join(data.groupId);
  });

  //add member zô room
  socket.on("add-member", (data) => {
    for (const value of loggedInUsers) {
      if (
        value.user_id === data.memId &&
        io.of("/").sockets.has(value.socket_id)
      ) {
        io.of("/").sockets.get(value.socket_id).join(data.groupId);
      }
    }
  });

  //group chat
  socket.on("client-sent-message-group", (data) => {
    io.sockets.in(data.groupId).emit("server-sent-message-group");
    // io.to(value.socket_id).emit("server-send-data", data); //gửi tới 1 thằng
    //io.sockets.emit("server-send-data", data); tắt cả socket
    //socket.broadcast.emit("server-send-data", data); tắt cả trừ th gửi
  });

  socket.on("friend_request", async (data) => {
    console.log(data.to);

    // data => {to, from}

    const to_user = await User.findById(data.to).select("socket_id");
    const from_user = await User.findById(data.from).select("socket_id");

    //create a friend requuest
    await FriendRequest.create({
      sender: data.from,
      recipient: data.to,
    });

    //TODO => create a friend request
    //emit event => new_friend_request
    io.to(to.socket_id).emit("new_friend_request", {
      message: "New Friend Request",
    });
    //emit event => request_sent
    io.to(from.socket_id).emit("request_sent", {
      message: "Friend Request Sent",
    });
  });

  socket.on("accept_request", async (data) => {
    console.log(data);

    const request_doc = await FriendRequest.findById(data.request_id);

    console.log(request_doc);

    //request_id

    const sender = await User.findById(request_doc.sender);
    const receiver = await User.findById(request_doc.recipient);

    sender.friends.push(request_doc.recipient);
    receiver.friends.push(request_doc.sender);

    await sender.save({ new: true, validateModifiedOnly: true });
    await receiver.save({ new: true, validateModifiedOnly: true });

    await FriendRequest.findByIdAndDelete(data.request_id);

    io.to(sender.socket_id).emit("request_accepted", {
      message: "Friend Request Accepted",
    });
    io.to(receiver.socket_id).emit("request_accepted", {
      message: "Friend Request Accepted",
    });
  });

  // Handle text/link mesagge
  socket.on("get_direct_conversations", async ({ user_id }, callback) => {
    const existing_conversations = await OneToOneMessage.find({
      participants: { $all: [user_id] },
    }).populate("participants", "firstName lastName _id email status");
    console.log(existing_conversations);

    callback(existing_conversations);
  });

  socket.on("text-message", async (data) => {
    console.log("REceived Message", data);

    //data: {to, from, text}

    //create a new conversation if it dosen't exist yet or add new message to the messages list

    //save to db

    //emit incoming_message -> to user

    //emit outgoing_message -> from user
  });

  socket.on("file_message", (data) => {
    console.log("Received File", data);

    // data: {to, from, file}

    // get the file extension
    const fileExtension = path.extname(data.file.name);

    //generate a unique filename
    const fileName = `${Date.now()}_${Math.floor(
      Math.random() * 10000
    )}${fileExtension}`;

    // upload file to AWS s3

    //create a new conversation if it dosen't exist yet or add new message to the messages list

    //save to db

    //emit incoming_message -> to user

    //emit outgoing_message -> from user
  });

  socket.on("end", async (data) => {
    //Find user by_id and setthe status to Offline
    if (data.user_id) {
      await User.findByIdAndUpdate(data.user_id, { status: "offline" });
    }

    //TODO => broaddcast user_disconnected
    console.log("Closing connection");
    socket.disconnect(0);
  });
});

process.on("unhandledRejection", (err) => {
  console.log(err);
  console.log("UNHANDLED REJECTION! Shutting down...");
  // server.close(() => {
  //   process.exit(1);
  // });
});
