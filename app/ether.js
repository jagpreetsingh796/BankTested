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

async function openAccount(name,age,region,typeOfAccount,amount)
{
let tx= await contractWithSigner.openAccount(name,age,region,typeOfAccount,{value:ethers.utils.parseEther(amount)})
console.log(tx)
return(tx)
}
// openAccount()

// contract.on("bal",(bal)=>{

//     console.log("The balance IN the event is",bal)
// })


async function checkbalanceofUSER(address)
{
    let bal = await contractWithSigner.callBalance(address)
    console.log("The balance is  in checkbalance function is",bal.toString())
    return(bal.toString())

}
// checkbalanceofUSER()
async function withdrawfrom(amount,address)
{
    let tx=await contractWithSigner.withdraw(ethers.utils.parseEther(amount))
    let bal = await contractWithSigner.callBalance(address)
    console.log("The balance after withdrawal is",bal.toString())
    // return(bal.toString())
}


 
async function checkbankbalance()
{
    let bal = await contractWithSigner.checkbalanceofbank()
    // console.log("The balance of the bank  is",bal.toNumber())
    return(bal.toString())

}
// checkbankbalance()

server.post('/getbal', async (request, response) => {
    let address=request.body.address

    
    response.send(value);
  });
server.post('/withdraw',async(request,response)=>
{
    let amount=request.body.amount
    let addr=request.body.address
   await withdrawfrom(amount,addr)
    let value = await checkbalanceofUSER(addr);
    
    response.send(value)

})
server.get('/getbalofbank',async(request,response)=>
{
   
    let value= await checkbankbalance()
    console.log("THe bank's balance is",value)
    response.send(value)

})
server.post('/openAccount',async(request,response)=>
{
    let name=request.body.name
    let age=request.body.age
    let region=request.body.region
    let typeOfAccount=request.body.type
    let amount=request.body.amount
    let tx= await openAccount(name,age,region,typeOfAccount,amount)
    response.send(tx)



})

server.listen(process.env.PORT,()=>{
    console.log("The server is running at",process.env.PORT)
})


