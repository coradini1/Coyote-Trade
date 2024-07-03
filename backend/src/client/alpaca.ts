const Alpaca = require("@alpacahq/alpaca-trade-api");

const alpacaClient = new Alpaca({
  keyId: process.env.API_KEY_ID,
  secretKey: process.env.API_SECRET_KEY,
  paper: true
});

export const alpaca = alpacaClient;
