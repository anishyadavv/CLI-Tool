const yargs = require("yargs");
const getBalance = require("./commands/balance");
const createWallet = require("./commands/create");
const listWallets = require("./commands/list");
const importWallet = require("./commands/import");
const getTransactions = require("./commands/transaction");

yargs
  .command("create", "Create a new wallet", () => {}, createWallet)
  .command(
    "import <mnemonic>",
    "Import a wallet from a BIP39 mnemonic",
    (yargs) => {
      yargs.positional("mnemonic", {
        type: "string",
        describe: "The BIP39 mnemonic",
      });
    },
    (argv) => {
      importWallet(argv.mnemonic);
    }
  )
  .command("list", "List all wallets", () => {}, listWallets)
  .command(
    "balance <walletId>",
    "Get bitcoin balance of a wallet",
    (yargs) => {
      yargs.positional("walletId", {
        type: "string",
        describe: "The ID of the wallet",
      });
    },
    async (argv) => {
      getBalance(argv.walletId).then((balance) => {
        console.log(`Balance of wallet ${argv.walletId}: ${balance}`);
      });
    }
  )
  .command(
    "transactions <walletId>",
    "Get list of bitcoin transactions of a wallet",
    (yargs) => {
      yargs.positional("walletId", {
        type: "string",
        describe: "The ID of the wallet",
      });
    },
    async (argv) => {
      getTransactions(argv.walletId).then((transactions) => {
        transactions.length > 0
          ? transactions.forEach((t) => {
              console.log(
                `- Hash: ${t.hash}, Amount: ${t.total}, Confirmations: ${t.confirmed}`
              );
            })
          : console.log("No Transaction held Yet");
      });
    }
  )
  .help()
  .alias("help", "h")
  .demandCommand(1, "You need at least one command before moving on")
  .strict().argv;
