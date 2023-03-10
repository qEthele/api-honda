const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

let luckyPlayerData = [];

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/data", (req, res) => {
  res.send(luckyPlayerData);
});

app.get("/resetAllData", (req, res) => {
  luckyPlayerData = [];
  res.send("Reset All Data !!!");
});

app.post("/login", (req, res) => {
  console.log(req.body);

  if (req.body.username === "admin" && req.body.password === "qwerty123456") {
    const data = true;
    res.send(data);
  } else {
    const data = false;
    res.send(data);
  }
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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
