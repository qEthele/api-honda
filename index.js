const express = require("express");
const cors = require("cors");
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

let luckyPlayerData = [];

app.get("/", (req, res) => {
  res.sendFile("home.html", { root: path.join(__dirname, "public") });
});

app.get("/data", (req, res) => {
  res.send(luckyPlayerData);
});
app.get("/showData", (req, res) => {
  res.sendFile("showData.html", { root: path.join(__dirname, "public") });
});

app.get("/resetAllData", (req, res) => {
  luckyPlayerData = [];
  res.send("Reset All Data !!!");
});

app.post("/mydata", (req, res) => {
  console.log(luckyPlayerData.length);
  if (req.body.status === 1) {
    if (luckyPlayerData.length < 10) {
      const data = { name: req.body.name, status: req.body.status };
      luckyPlayerData = luckyPlayerData.concat(data);
      res.send(data);
    } else {
      const data = { name: req.body.name, status: 0 };
      res.send(data);
    }
  } else {
    const data = { name: req.body.name, status: req.body.status };
    res.send(data);
  }
});

app.listen(process.env.PORT || { port }, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
