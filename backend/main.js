const express = require("express");
var cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
//const Alpaca = require("@alpacahq/alpaca-trade-api");

const app = express();
const port = 3002;

app.use(cors({
  origin: "*"
}));

/*const alpaca = new Alpaca({
  keyId: "PK2S1PUXJK0JOVJXRA38",
  secretKey: "slIZw60hrM4bkzDOhHwgdo3M7Pjsg3s7UifN4tHz",
  paper: true,
});*/

const db = new sqlite3.Database("./test.db");

app.get("/", (req, res) => {
  const query = `
    SELECT DATE(dateOfCreation) AS date, COUNT(*) AS users_gain
    FROM users
    WHERE dateOfCreation >= date('now', '-7 days')
    GROUP BY DATE(dateOfCreation)
    ORDER BY DATE(dateOfCreation);
  `;

  db.all(query, (error, rows) => {
    if (error) {
      console.error('Error fetching user creation data:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    const formattedData = rows.map(row => {
      const [year, month, day] = row.date.split('-');
      const formattedDate = `${day}/${month}`;

      return {
        date: formattedDate,
        users_gain: row.users_gain
      };
    });

    res.json(formattedData);
  });

  /*function getPositions() {
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
  getPositions();*/
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
