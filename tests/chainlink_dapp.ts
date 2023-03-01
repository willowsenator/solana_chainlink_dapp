
import * as anchor from "@project-serum/anchor";

const CHAINLINK_FEED = "99B2bTijsU6f1GCT73HmdR7HCFFjGMBcPZY6jZ96ynrR";
const CHAINLINK_PROGRAM="HEvSKofvBgfaexv23kMabbYqxasxU3mQ4ibBMEmJWHny";
describe("chainlink_dapp", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.ChainlinkDapp;

  it("Queries SOL/USD Price Feed", async()=>{
    const resultAccount = anchor.web3.Keypair.generate();

    await program.rpc.execute({
      accounts:{
        resultAccount: resultAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
        chainlinkProgram: CHAINLINK_PROGRAM,
        chainlinkFeed: CHAINLINK_FEED,
      },
      signers:[resultAccount],
    });




    const latestPrice = await program.account.resultAccount.fetch(resultAccount.publicKey);
    console.log("Price is: " + latestPrice.value / 100000000);
  });
});
