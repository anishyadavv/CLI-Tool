const bip39 = require("bip39");
const bitcoin = require("bitcoinjs-lib");
const ecc = require("tiny-secp256k1");
const { BIP32Factory } = require("bip32");
const bip32 = BIP32Factory(ecc);

function getAddress(mnemonic) {
  const seed = bip39.mnemonicToSeedSync(mnemonic);
  const root = bip32.fromSeed(seed, bitcoin.networks.bitcoin);
  const path = "m/44'/0'/0'/0/0"; // This is a common path used for Bitcoin addresses
  const child = root.derivePath(path);
  const { address } = bitcoin.payments.p2pkh({ pubkey: child.publicKey });
  return address;
}

module.exports = getAddress;
