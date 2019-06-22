const ethers = require('ethers');
const express = require('express')
const bodyParser = require('body-parser')
const server=express()
server.use(bodyParser.json());

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

// async function openAccount()
// {
// let tx= await contractWithSigner.openAccount("aaaa",25,"bbbb","cccc",{value:ethers.utils.parseEther("1.0")})
// console.log(tx)
// }
// openAccount()
// contract.on("bal",(bal)=>{

//     console.log("The balance is",bal)
// })

async function checkbalanceofUSER()
{
    let bal = await contractWithSigner.callBalance()
    console.log("The balance is",bal)
    return(bal)

}
// checkbalanceofUSER()
async function withdrawfrom( amount)
{
    let tx=await contractWithSigner.withdraw(amount)
    console.log("THe transaction is",tx)
    return 

}
async function checkbankbalance()
{
    let bal = await contractWithSigner.checkbalanceofbank()
    console.log("The balance is",bal)
    return(bal)

}

server.get('/getbal', async (request, response) => {
    let value = await checkbalance();
    response.send(value);
  });
server.post('/withdraw',async(request,response)=>
{
    let amount=request.body.amount
    await contractWithSigner.withdraw(amount)
    let value= await checkbalance();
    response.send(value)

})
server.post('/getbaluser',async(request,response)=>
{
    let addr=request.body.address
    
    let value= await contractWithSigner.callBalance(addr) 
    console.log("THe user balance is",value)
    response.send(value)

})
server.listen(process.env.PORT,()=>{
    console.log("The server is running at",process.env.PORT)
})

