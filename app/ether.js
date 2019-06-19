const ethers = require('ethers');
const aa=require('../build/contracts/Bank.json')
require('dotenv').config();
const pk=process.env.privateKey
let provider = ethers.getDefaultProvider("rinkeby");
let wallet = new ethers.Wallet(pk,provider)
let bytecode=aa.code
let abi=aa.abiDefinition

// let factory = new ethers.ContractFactory(abi, bytecode, wallet);
// async function deploythecontract()
// {
//     let contract = await factory.deploy()
//     await contract.deployed()
//     console.log(contract)
// }

// deploythecontract()

let address='0x0037923C56f2fe27394A85516480445f013F8bDA'
let contract = new ethers.Contract(address, abi, provider);
contractWithSigner=contract.connect(wallet)
// console.log(contractWithSigner)

async function openAccount()
{
let tx= await contractWithSigner.openAccount("aaaa",25,"bbbb","cccc",{value:ethers.utils.parseEther("1.0")})
console.log(tx)
}
openAccount()
contract.on("bal",(bal)=>{

    console.log("The balance is",bal)
})