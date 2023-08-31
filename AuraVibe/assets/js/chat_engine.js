class chatEngine {
  constructor(chatBoxID, userEmail, userName) {
    this.chatBox = `#${chatBoxID}`; // This creates a CSS selector for the chat box element.
    this.userEmail = userEmail;
    this.userName = userName;
    this.socket = io.connect("http://localhost:3000");

    if (this.userEmail) {
      this.conenctionHandler();
    }

    this.enterToSend();
  }

  conenctionHandler() {
    let self = this;

    this.socket.on("connect", function () {
      console.log("Connection to server is established using socket.io");

      //creating chatroom.
      console.log("user is sending the request to join the chat room");
      self.socket.emit("join_room", {
        user_email: self.userEmail,
        chat_room: "auravibe",
      });

      self.socket.on("user_joined", function (data) {
        console.log(`${data.user_email} user joined the chat.`);
      });
      console.log("process for joining the chat completed for one user");

      //sending-receiving message.

      $("#send-button").click(function () {
        let msg = $("#message-input").val();
        if (msg != "") {
          self.socket.emit("send_message", {
            message: msg,
            userEmail: self.userEmail,
            userName: self.userName,
            chat_room: "auravibe",
          });
        }

        $("#message-input").val("");
      });

      self.socket.on("receive_message", function (data) {
        let newMessage = $("<li>");
        let messageType = "other-message";

        if (data.userEmail == self.userEmail) {
          messageType = "self-message";
        }

        newMessage.addClass("message");
        newMessage.addClass(messageType);

        // Create and append the username div
        let usernameDiv = $("<div>").addClass("username");
        usernameDiv.text(data.userName);

        // Append the usernameDiv and message text to the newMessage
        newMessage.append(usernameDiv);
        newMessage.append(data.message);

        $("#chat-message-list").append(newMessage);

        $("#chat-messages").scrollTop($("#chat-messages")[0].scrollHeight);
      });
    });
  }

  enterToSend() {
    $(document).ready(function () {
      // Trigger send button click on Enter key press
      $("#message-input").on("keydown", function (event) {
        if (event.keyCode === 13) {
          event.preventDefault();
          $("#send-button").click();
        }
      });
    });
  }
}
