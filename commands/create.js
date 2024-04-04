const bip39 = require("bip39");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { promisify } = require("util");
const writeFile = promisify(fs.writeFile);

async function createWallet(){
  const mnemonic = bip39.generateMnemonic();
  const wallet = {
    id: uuidv4(),
    mnemonic,
  };
  const path = `./wallets/${wallet.id}.json`;
  await writeFile(path, JSON.stringify(wallet));
  console.log(`Wallet created with ID: ${wallet.id}`);
  console.log(`Mnemonic: ${wallet.mnemonic}`);
};

module.exports = createWallet;
