// scripts/deploy.js
const { ethers } = require("hardhat");

async function main() {
  // Get the contract owner
  const contractOwner = await ethers.getSigners();
  console.log(`Deploying contract from: ${contractOwner[0].address}`);

  // Hardhat helper to get the ethers contractFactory object
  const YHJToken = await ethers.getContractFactory("YHJToken");

  // Deploy the contract
  console.log("Deploying YHJToken...");
  const yhjToken = await YHJToken.deploy();
  await yhjToken.deployed();
  console.log(`YHJToken deployed to: ${yhjToken.address}`);
}

main()
  .then(() => process.exit(0)) // 함수 호출후 script 종료
  .catch((error) => {
    console.error(error);
    process.exitCode = 1; // 오류 발생코드
  });
