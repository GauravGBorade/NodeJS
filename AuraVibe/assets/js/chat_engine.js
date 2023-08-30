class chatEngine {
  constructor(chatBoxID, userEmail) {
    this.chatBox = `#${chatBoxID}`; // This creates a CSS selector for the chat box element.
    this.userEmail = userEmail;
    this.socket = io.connect("http://localhost:3000");

    if (this.userEmail) {
      this.conenctionHandler();
    }
  }

  conenctionHandler() {
    let self = this;

    this.socket.on("connect", function () {
      console.log("Connection to server is established using socket.io");

      console.log("user is sending the request to join the chat room");
      self.socket.emit("join_room", {
        user_email: self.userEmail,
        chat_room: "auravibe",
      });

      self.socket.on("user_joined", function (data) {
        console.log(`${data.user_email} user joined the chat.`);
      });
      console.log("process for joining the chat completed for one user");
    });
  }
}
