var app = require("express")();
var server = require("http").createServer(app);
// http server를 socket.io server로 upgrade
var io = require("socket.io")(server, {
  pingTimeout: 1000,
});

// setting cors
app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// localhost:3000 서버에 접속하면 client로 메세지 전송
app.get("/", function (req, res) {
  res.sendFile("Hellow Chating App Server");
});

//connection event handler
io.on("connection", function (socket) {
  // client로부터의 메시지가 수신되면
  socket.on("chat", function (data) {
    console.log("Message from %s: %s", data.name, data.msg);

    var msg = {
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
