const axios = require("axios");
const getAddress = require("./address");

const address = getAddress(
  "maze lounge bone bomb large unfold multiply bone multiply miss learn silent"
);

async function getBalance(address) {
  const response = await axios.get(
    `https://api.blockcypher.com/v1/btc/main/addrs/${address}/balance`
  );
  return response.data.balance;
}
async function printBalance(){
    const balance = await getBalance(address);
    console.log(balance);
}

printBalance();