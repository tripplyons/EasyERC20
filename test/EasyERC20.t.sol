// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "forge-std/Test.sol";
import "../src/EasyERC20.sol";

contract EasyERC20Test is Test {
    EasyERC20 public easyERC20;
    address public owner = address(100);
    address public user = address(101);
    address public attacker = address(102);

    function setUp() public {
        easyERC20 = new EasyERC20("Test", "TEST", owner);
    }

    function testMint() public {
        vm.prank(owner);
        easyERC20.mint(owner, 100);
        assertEq(easyERC20.balanceOf(owner), 100);
    }

    function testMintAccess() public {
        vm.prank(attacker);
        vm.expectRevert("UNAUTHORIZED");
        easyERC20.mint(attacker, 100);
        assertEq(easyERC20.balanceOf(attacker), 0);
    }
}
