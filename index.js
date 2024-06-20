const web3 = require("@solana/web3.js");
const chalk = require("chalk");

const connection = new web3.Connection("https://devnet.sonic.game", 'confirmed') // Tempat mengganti rpc apabila kedepannya diperlukan

const privkey = [0o0,... 0o0]; // Ubah dengan privkey anda
const from = web3.Keypair.fromSecretKey(new Uint8Array(privkey))
const to = web3.Keypair.generate(); // Auto generator address SOL

(async () => {
    const transaction = new web3.Transaction().add(
        web3.SystemProgram.transfer({
          fromPubkey: from.publicKey,
          toPubkey: to.publicKey,
          lamports: web3.LAMPORTS_PER_SOL * 0.001, // Ganti jumlah sol yang dikirim sesuka kalian
        }),
      );
    
      // MAIN TX
      const txCount = 100; // Ubah angka sesuai dengan jumlah transaksi yang anda inginkan
      for (let i = 0; i < txCount; i++) {
      const signature = await web3.sendAndConfirmTransaction(
        connection,
        transaction,
        [from],
      );
      console.log(chalk.blue('Create tx done, tx hash ->'), signature);
    }
})()