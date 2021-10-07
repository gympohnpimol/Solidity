//const {task} = require('hardhat/config');

// require("@nomiclabs/hardhat-waffle");

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import { run, ethers } from "hardhat";

import '@typechain/hardhat'
import '@nomiclabs/hardhat-ethers'

task("accounts", "Display accounts", async (args, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
})

const mnemonic = 'supply uphold also chronic same absorb kitten keep wealth oppose horn job'
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 export default {
  solidity: "0.8.7",
  networks: {
    rinkrby: {
      url: '',
      accounts: {mnemonic: mnemonic}
    }
  }, 
  typechain: {
    outDir: 'src/types',
    target: 'ethers-v5',
    alwaysGenerateOverloads: false, // should overloads with full signatures like deposit(uint256) be generated always, even if there are no overloads?
    externalArtifacts: ['externalArtifacts/*.json'], // optional array of glob patterns with external artifacts to process (for example external libs from node_modules)
  }
} as HardhatUserConfig ;
