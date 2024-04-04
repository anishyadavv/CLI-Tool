const bip39 = require("bip39");
const hdkey = require("hdkey");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const { promisify } = require("util");
const writeFile = promisify(fs.writeFile);

async function importWallet(mnemonic) {
  const id = uuidv4();
  const seed = await bip39.mnemonicToSeed(mnemonic);
  const root = hdkey.fromMasterSeed(seed);
  const masterPrivateKey = root.privateKey.toString("hex");
  const path = `./wallets/${id}.json`;
  const wallet = {
    id,
    mnemonic,
    masterPrivateKey,
  };
  await writeFile(path, JSON.stringify(wallet));
  console.log(`Wallet imported with ID: ${id}`);
}

module.exports  = importWallet;
