require("dotenv").config();
let express = require("express");
let app = express();

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");

  app.use("/public", express.static(__dirname + "/public"));
});

app.get("/json", (req, res) => {
  res.json({
    message:
      process.env.MESSAGE_STYLE === "uppercase" ? "HELLO JSON" : "Hello json",
  });
});

app.use(function middleware(req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});
console.log("Hello World!");

module.exports = app;
