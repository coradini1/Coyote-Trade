const express = require("express");
const Alpaca = require("@alpacahq/alpaca-trade-api");

const app = express();
const port = 3002;

const alpaca = new Alpaca({
  keyId: "PK2S1PUXJK0JOVJXRA38",
  secretKey: "slIZw60hrM4bkzDOhHwgdo3M7Pjsg3s7UifN4tHz",
  paper: true,
});

app.get("/", (req, res) => {
  function getPositions() {
    alpaca
      .getOrders({
        status: "all",
        limit: 1,
        direction: "asc",
      })
      .then((response) => {
        console.log(response);
        res.send(response);
      });
  }
  getPositions();
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
