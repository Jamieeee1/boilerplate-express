require("dotenv").config();
let bodyParser = require("body-parser");
let express = require("express");
let app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

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

app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.send({ time: req.time });
  }
);

app.get("/:word/echo", (req, res, next) => {
  const word = req.params.word;
  res.send({ echo: word });
});

app.route("/name").get((req, res) => {
  const firstName = req.query.first;
  const lastName = req.query.last;
  res.json({ name: `${firstName} ${lastName}` });
});

console.log("Hello World!");

module.exports = app;
