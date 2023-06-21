// scripts/interact.js
const { ethers } = require("hardhat");

async function main() {
  console.log("Getting the YHJ token contract...");
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const yhjToken = await ethers.getContractAt("YHJToken", contractAddress);

  // symbol()
  console.log("Querying token symbol...");
  const symbol = await yhjToken.symbol();
  console.log(`Token Symbol: ${symbol}\n`);

  // decimals()
  console.log("Querying decimals...");
  const decimals = await yhjToken.decimals();
  console.log(`Token Decimals: ${decimals}\n`);

  // totalSupply()
  console.log("Querying token supply...");
  const totalSupply = await yhjToken.totalSupply();
  console.log(`Total Supply including all decimals: ${totalSupply}`);
  console.log(
    `Total supply including all decimals comma separated: ${ethers.utils.commify(
      totalSupply
    )}`
  ); // 천단위 구분하여 문자열로 반환
  console.log(
    `Total Supply in YHJ: ${ethers.utils.formatUnits(totalSupply, decimals)}\n`
  ); // 토큰 값을 해당 소수 자릿수로 나누어 YHJ단위로 변환

  // balanceOf(address account)
  console.log("Getting the balance of contract owner...");
  const signers = await ethers.getSigners();
  const ownerAddress = signers[0].address;
  let ownerBalance = await yhjToken.balanceOf(ownerAddress);
  console.log(
    `Contract owner at ${ownerAddress} has a ${symbol} balance of ${ethers.utils.formatUnits(
      ownerBalance,
      decimals
    )}\n`
  );

  // transfer(to, amount)
  console.log("Initiating a transfer...");
  const recipientAddress = signers[1].address;
  const transferAmount = 100000;
  console.log(
    `Transferring ${transferAmount} ${symbol} tokens to ${recipientAddress} from ${ownerAddress}`
  );
  await yhjToken.transfer(
    recipientAddress,
    ethers.utils.parseUnits(transferAmount.toString(), decimals)
  ); // ethers.utils.parseUnits() 함수를 사용하여 소수 자릿수에 맞게 변환
  console.log("Transfer completed");
  ownerBalance = await yhjToken.balanceOf(ownerAddress);
  console.log(
    `Balance of owner (${ownerAddress}): ${ethers.utils.formatUnits(
      ownerBalance,
      decimals
    )} ${symbol}`
  );
  let recipientBalance = await yhjToken.balanceOf(recipientAddress);
  console.log(
    `Balance of recipient (${recipientAddress}): ${ethers.utils.formatUnits(
      recipientBalance,
      decimals
    )} ${symbol}\n`
  );

  // approve(address spender, uint256 amount)
  console.log(
    `Setting allowance amount of spender over the caller\'s ${symbol} tokens...`
  );
  const approveAmount = 10000;
  console.log(
    `This example allows the contractOwner to spend up to ${approveAmount} of the recipient\'s ${symbol} token`
  );
  const signerContract = yhjToken.connect(signers[1]); // Creates a new instance of the contract connected to the recipient
  await signerContract.approve(
    ownerAddress,
    ethers.utils.parseUnits(approveAmount.toString(), decimals)
  );
  console.log(`Spending approved\n`);

  // allowance(address owner, address spender)
  console.log(
    `Getting the contracOwner spending allowance over recipient\'s ${symbol} tokens...`
  );
  let allowance = await yhjToken.allowance(recipientAddress, ownerAddress);
  console.log(
    `contractOwner Allowance: ${ethers.utils.formatUnits(
      allowance,
      decimals
    )} ${symbol}\n`
  );

  // transferFrom(address from, address to, uint256 amount)
  const transferFromAmount = 100;
  console.log(
    `contracOwner transfers ${transferFromAmount} ${symbol} from recipient\'s account into own account...`
  );
  await yhjToken.transferFrom(
    recipientAddress,
    ownerAddress,
    ethers.utils.parseUnits(transferFromAmount.toString(), decimals)
  );
  ownerBalance = await yhjToken.balanceOf(ownerAddress);
  console.log(
    `New owner balance (${ownerAddress}): ${ethers.utils.formatUnits(
      ownerBalance,
      decimals
    )} ${symbol}`
  );
  recipientBalance = await yhjToken.balanceOf(recipientAddress);
  console.log(
    `New recipient balance (${recipientAddress}): ${ethers.utils.formatUnits(
      recipientBalance,
      decimals
    )} ${symbol}`
  );
  allowance = await yhjToken.allowance(recipientAddress, ownerAddress);
  console.log(
    `Remaining allowance: ${ethers.utils.formatUnits(
      allowance,
      decimals
    )} ${symbol}\n`
  );

  // increaseAllowance(address spender, uint256 addedValue)
  const incrementAmount = 100;
  console.log(
    `Incrementing contractOwner allowance by ${incrementAmount} ${symbol}...`
  );
  await signerContract.increaseAllowance(
    ownerAddress,
    ethers.utils.parseUnits(incrementAmount.toString(), decimals)
  );
  allowance = await yhjToken.allowance(recipientAddress, ownerAddress);
  console.log(
    `Updated allowance: ${ethers.utils.formatUnits(
      allowance,
      decimals
    )} ${symbol}\n`
  );

  // decreaseAllowance(address spender, uint256 subtractedValue)
  const subtractAmount = 100;
  console.log(
    `Subtracting contractOwner allowance by ${subtractAmount} ${symbol}...`
  );
  await signerContract.decreaseAllowance(
    ownerAddress,
    ethers.utils.parseUnits(subtractAmount.toString(), decimals)
  );
  allowance = await yhjToken.allowance(recipientAddress, ownerAddress);
  console.log(
    `Updated allowance: ${ethers.utils.formatUnits(
      allowance,
      decimals
    )} ${symbol}\n`
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
