const socket = io();
const output = document.getElementById("output");

function log(msg) {
  const p = document.createElement("p");
  p.textContent = msg;
  output.prepend(p);
}

socket.on("like", data => {
  log(`❤️ ${data.user} hat ${data.count} Likes gesendet`);
});

socket.on("gift", data => {
  log(`🎁 ${data.user} hat ${data.gift} x${data.count} gesendet`);
});

socket.on("chat", data => {
  log(`💬 ${data.user}: ${data.comment}`);
});
