const app = require("express")();
const server = require("http").createServer(app);
// http server를 socket.io server로 upgrade
const io = require("socket.io")(server, {
  pingTimeout: 1000,
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
  },
});

// localhost:3000 서버에 접속하면 client로 메세지 전송
app.get("/", function (req, res) {
  res.send("Hello");
});

//connection event handler
io.on("connection", function (socket) {
  // client로부터의 메시지가 수신되면
  socket.on("chat", (data) => {
    console.log("Message from %s: %s", data.name, data.msg);

    let msg = {
      from: {
        name: data.name,
      },
      msg: data.msg,
    };

    // 메시지를 전송한 client를 제외한 모든 client에게 메시지를 전송한다
    socket.broadcast.emit("chat", msg);
  });

  socket.on("disconnect", function () {
    console.log("user disconnected: " + socket.name);
  });
});

server.listen(3000);
