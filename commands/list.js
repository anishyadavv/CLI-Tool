const { promisify } = require("util");
const fs = require("fs");
const readFile = promisify(fs.readFile);

async function listWallets() {
  const walletsDir = "./wallets";
  const files = await fs.promises.readdir(walletsDir);
  const wallets = [];
  for (const file of files) {
    const content = await readFile(`${walletsDir}/${file}`, "utf8");
    wallets.push(JSON.parse(content));
  }
  console.log("Wallets:");
  wallets.forEach((wallet) => {
    console.log(`- ID: ${wallet.id}, Mnemonic: ${wallet.mnemonic}`);
  });
}

module.exports = listWallets;