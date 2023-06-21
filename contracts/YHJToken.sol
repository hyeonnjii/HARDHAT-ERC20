// contracts/YHJToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { ERC20 } from "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract YHJToken is ERC20 {

    // Define the supply of YHJToken: 1,000,000 
    uint256 constant initialSupply = 1000000 * (10**18);

    // Constructor will be called on contract creation
    constructor() ERC20("YHJToken", "YHJ") {
        _mint(msg.sender, initialSupply);
    }
}