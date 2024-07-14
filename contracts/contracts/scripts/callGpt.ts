// Import ethers from Hardhat package
import readline from "readline";

const { ethers } = require("hardhat");
import { parseAbi, decodeEventLog } from 'viem'


async function main() {
  const contractABI = [
    "function getResponse(uint runId) public view returns (string[] memory)",
    "function sendMessage(string memory _message, string[] memory tags) public returns (uint)"
  ];

  if (!process.env.QUICKSTART_CONTRACT_ADDRESS) {
    throw new Error("QUICKSTART_CONTRACT_ADDRESS env variable is not set.");
  }
  const contractAddress = process.env.QUICKSTART_CONTRACT_ADDRESS;
  const [signer] = await ethers.getSigners();

  // Create a contract instance
  const contract = new ethers.Contract(contractAddress, contractABI, signer);
  const resptest = await contract.getResponse(6561);
  console.log("resptest", resptest);
  // The content of the image you want to generate
  const testmessage = "L2con by Epic Web3 was a blast!  850 attendees in total! 30 speakers! Amazing discussions brought by the leading builders in web3! Very thankful to all of you for making it happen"
  // Call the startChat function
  const transactionResponse = await contract.sendMessage(testmessage, ["l2con", "food", "football", "apecoin", "architecture", "conference", "blockchain"]);

  const receipt = await transactionResponse.wait();
  // Get the return value from the transaction receipt
  const id = receipt.logs[0].data;



  console.log("Message ID:", JSON.stringify(id));

  console.log(`Transaction sent, hash: ${receipt.hash}.\nExplorer: https://explorer.galadriel.com/tx/${receipt.hash}`)

  // loop and sleep by 1000ms, and keep printing `lastResponse` in the contract.
  let lastResponse = await contract.getResponse(id);
  let newResponse = lastResponse;

  // print w/o newline
  console.log("Waiting for response: ");
  while (newResponse === lastResponse) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    newResponse = await contract.getResponse(id);
    console.log(". ", newResponse);
  }

  console.log(`Image generation completed, image URL: ${newResponse}`)

}

async function getUserInput(): Promise<string | undefined> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  const question = (query: string): Promise<string> => {
    return new Promise((resolve) => {
      rl.question(query, (answer) => {
        resolve(answer)
      })
    })
  }

  try {
    const input = await question("Enter an image description: ")
    rl.close()
    return input
  } catch (err) {
    console.error('Error getting user input:', err)
    rl.close()
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });