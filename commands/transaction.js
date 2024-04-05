const axios = require("axios");
const dotenv = require("dotenv");
const fs = require("fs");
const { promisify } = require("util");
const readFile = promisify(fs.readFile);

const getAddress = require("./address");

dotenv.config();

const API_KEY = process.env.BLOCKCYPHER_API_KEY;

async function getTransactions(id) {
  const path = `./wallets/${id}.json`;
  const content = await readFile(path, "utf8");
  const wallet = JSON.parse(content);
  const mnemonic = wallet.mnemonic;
  const address = getAddress(mnemonic);

  const response = await axios.get(
    `https://api.blockcypher.com/v1/btc/main/addrs/${address}/full?token=${API_KEY}`
  );
  return response.data.txs;
}

module.exports = getTransactions;