module.exports.chatSockets = function (chatServer) {
  let io = require("socket.io")(chatServer, {
    cors: {
      origin: "http://localhost:8000",
      methods: ["GET", "POST"],
    },
  });

  io.sockets.on("connection", function (socket) {
    console.log("new connection received at observer server", socket.id);

    socket.on("disconnect", function () {
      console.log("socket is disconnected");
    });

    socket.on("join_room", function (data) {
      console.log(
        "first the request is received for joining the room from",
        data.user_email,
        "then we joined the chat and send another event with names user_joined"
      );
      socket.join(data.chat_room);
      io.in(data.chat_room).emit("user_joined", data);
    });

    //detecting the send message and broadcasting it to every user.
    socket.on("send_message", function (data) {
      io.in(data.chat_room).emit("receive_message", data);
    });
  });
};
