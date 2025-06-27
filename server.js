const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { WebcastPushConnection } = require("tiktok-live-connector");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const port = process.env.PORT || 3000;
app.use(express.static("public"));

const streamerUsername = "crissyhalt"; // Ersetze das!

const tiktokConnection = new WebcastPushConnection(streamerUsername);

tiktokConnection.connect().then(() => {
  console.log(`🎥 Verbunden mit @${streamerUsername}`);
}).catch(err => {
  console.error("Verbindungsfehler:", err);
});

tiktokConnection.on("like", data => {
  io.emit("like", {
    user: data.uniqueId,
    count: data.likeCount
  });
});

tiktokConnection.on("gift", data => {
  io.emit("gift", {
    user: data.uniqueId,
    gift: data.giftName,
    count: data.repeatCount
  });
});

tiktokConnection.on("chat", data => {
  io.emit("chat", {
    user: data.uniqueId,
    comment: data.comment
  });
});

server.listen(port, () => {
  console.log(`🚀 Server läuft auf Port ${port}`);
});
