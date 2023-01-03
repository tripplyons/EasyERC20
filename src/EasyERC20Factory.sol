// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./EasyERC20.sol";
import "solmate/auth/Owned.sol";
import "solmate/tokens/ERC20.sol";

// EasyERC20Factory is a contract that allows users to create new ERC20 tokens
// it is free to use, but the owner of the factory will part of the initial supply
contract EasyERC20Factory is Owned {
    event EasyERC20Created(address indexed easyERC20);
    event FeeChanged(uint256 fee, uint256 feeDivisor);

    uint256 public fee;
    uint256 public feeDivisor;

    // initializes settings
    constructor(uint256 _fee, uint256 _feeDivisor) Owned(msg.sender) {
        // make sure fee is less than 100%
        require(_fee < _feeDivisor, "fee must be less than fee divisor");

        fee = _fee;
        feeDivisor = _feeDivisor;
    }

    // main function to be called by users
    // creates a new EasyERC20 token and mints the initial supply
    // the owner of the factory will receive a fee
    function createToken(
        string memory _name,
        string memory _symbol,
        uint256 _initialSupply
    ) public returns (address) {
        require(_initialSupply > 0, "initial supply must be greater than 0");

        // make the token owned under the factory
        EasyERC20 easyERC20 = new EasyERC20(_name, _symbol, address(this));

        // calculate the fee
        uint256 feeAmount = (_initialSupply * fee) / feeDivisor;
        uint256 remainingSupply = _initialSupply - feeAmount;

        // mint the initial supply to the user
        easyERC20.mint(msg.sender, remainingSupply);
        // mint the fee to the owner of the factory
        easyERC20.mint(owner, feeAmount);

        emit EasyERC20Created(address(easyERC20));

        return address(easyERC20);
    }

    // lets the owner update the fee
    function setFee(uint256 _fee) public onlyOwner {
        // make sure fee is less than 100%
        require(_fee < feeDivisor, "fee must be less than fee divisor");

        fee = _fee;
        emit FeeChanged(fee, feeDivisor);
    }

    // feeDivisor is used to calculate the fee
    // sends fee / feeDivisor of the supply to the owner of the factory
    function setFeeDivisor(uint256 _feeDivisor) public onlyOwner {
        // make sure fee is less than 100%
        require(fee < _feeDivisor, "fee must be less than fee divisor");

        feeDivisor = _feeDivisor;
        emit FeeChanged(fee, feeDivisor);
    }

    // used to recover ether sent to this contract by mistake
    function withdraw() public onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

    // used to recover ERC20 tokens sent to this contract by mistake
    function withdrawToken(address token) public onlyOwner {
        ERC20(token).transfer(owner, ERC20(token).balanceOf(address(this)));
    }
}
