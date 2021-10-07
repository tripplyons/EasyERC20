//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./openzeppelin/ERC20.sol";

contract EasyERC20 is ERC20 {
    constructor(string memory name_, string memory symbol_, uint supply, address supplyAddress) ERC20(name_, symbol_) {
        _mint(supplyAddress, supply);
    }
}
