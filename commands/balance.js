const axios = require("axios");
const getAddress = require("./address");
const fs = require("fs");
const { promisify } = require("util");
const readFile = promisify(fs.readFile);

async function getBalance(id) {
  const path = `./wallets/${id}.json`;
  const content = await readFile(path, "utf8");
  const wallet = JSON.parse(content);

  const mnemonic = wallet.mnemonic;
  const address = getAddress(mnemonic);
  const response = await axios.get(
    `https://api.blockcypher.com/v1/btc/main/addrs/${address}/balance`
  );
  const balance = response.data.balance;
  return balance;
}

module.exports = getBalance;
