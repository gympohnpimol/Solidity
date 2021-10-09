import { ethers } from "ethers";
import { useState } from "react";
import {Web3Provider, JsonRpcSigner, JsonRpcProvider} from "@ethersproject/providers"

import { address } from './contracts/address.json';
import { abi } from './contracts/abi.json';
import { Greeter } from '../../src/types/Greeter';

let provider: Web3Provider | JsonRpcProvider;
let signer: JsonRpcSigner;
let greetContract: Greeter;
function App() {

  const [addressWallet, setAddressWallet] = useState('0x');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  async function connect () {
    provider =  new ethers.providers.JsonRpcProvider();
    signer = provider.getSigner();

    setAddressWallet(await signer.getAddress())
    console.log('signer: ', signer);

    //create contract instanct

    greetContract = new ethers.Contract( address, abi, signer) as Greeter;
  }

  async function greet() {
    if ( greetContract === undefined )
      setStatus('Please firstly connect wallet');
    else 
      setStatus(await greetContract.greet())
  }

  async function setGreet() {
    if (greetContract === undefined)
      setStatus('Please firstly connect wallet');
    else {
      const tx = await greetContract.connect(signer).setGreeting(message);
      await tx.wait();
      setStatus('Write to block successfully')
    }
  }
  return (
    <div>
      <div>Address: {addressWallet}</div>
      <div><button onClick={() => connect()}>Connect</button></div>
      <div>Status: {message}</div>
      <div><button onClick={() => greet()}>Get</button></div>
      <div>
        <button onClick={() => setGreet()}>set</button>
        <button onClick={() => greet()}>Get</button>
      </div>
    </div>
    
    
  )
}

export default App
