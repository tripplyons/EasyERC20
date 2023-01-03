// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "forge-std/Test.sol";
import "../src/EasyERC20.sol";
import "../src/EasyERC20Factory.sol";

contract EtherSelfDestructor {
    constructor() {}

    receive() external payable {}

    function destroy(address target) public {
        selfdestruct(payable(target));
    }
}

contract EasyERC20FactoryTest is Test {
    EasyERC20Factory public factory;
    address public owner = address(100);
    address public user = address(101);
    address public attacker = address(102);

    function setUp() public {
        vm.prank(owner);
        // 1% fee
        factory = new EasyERC20Factory(1, 100);
    }

    function testCreateToken() public {
        // user creates the token
        vm.prank(user);
        address tokenAddress = factory.createToken("Test", "TEST", 100);
        EasyERC20 token = EasyERC20(tokenAddress);
        // check initial balances
        assertEq(token.balanceOf(user), 99);
        assertEq(token.balanceOf(owner), 1);
    }

    function testSetFee() public {
        // owner changes the fee
        vm.prank(owner);
        factory.setFee(2);
        assertEq(factory.fee(), 2);
        // user creates the token
        vm.prank(user);
        address tokenAddress = factory.createToken("Test", "TEST", 100);
        EasyERC20 token = EasyERC20(tokenAddress);
        // check initial balances
        assertEq(token.balanceOf(user), 98);
        assertEq(token.balanceOf(owner), 2);
    }

    function testSetFeeAccess() public {
        // attacker tries to change the fee
        vm.prank(attacker);
        vm.expectRevert("UNAUTHORIZED");
        factory.setFee(2);
        assertEq(factory.fee(), 1);
    }

    function testSetFeeDivisor() public {
        // owner changes the fee divisor
        vm.prank(owner);
        // out of 1000 instead of 100
        factory.setFeeDivisor(1000);
        assertEq(factory.feeDivisor(), 1000);
        // user creates the token
        vm.prank(user);
        address tokenAddress = factory.createToken("Test", "TEST", 1000);
        EasyERC20 token = EasyERC20(tokenAddress);
        // check initial balances
        assertEq(token.balanceOf(user), 999);
        assertEq(token.balanceOf(owner), 1);
    }

    function testSetFeeDivisorAccess() public {
        // attacker tries to change the fee divisor
        vm.prank(attacker);
        vm.expectRevert("UNAUTHORIZED");
        factory.setFeeDivisor(1000);
        assertEq(factory.feeDivisor(), 100);
    }

    function testWithdraw() public {
        // contract forcefully receives ether
        EtherSelfDestructor destructor = new EtherSelfDestructor();
        payable(address(destructor)).transfer(100);
        destructor.destroy(address(factory));

        // owner withdraws ether
        vm.prank(owner);
        factory.withdraw();
        assertEq(owner.balance, 100);
    }

    function testWithdrawAccess() public {
        // contract forcefully receives ether
        EtherSelfDestructor destructor = new EtherSelfDestructor();
        payable(address(destructor)).transfer(100);
        destructor.destroy(address(factory));

        // attacker tries to withdraw ether
        vm.prank(attacker);
        vm.expectRevert("UNAUTHORIZED");
        factory.withdraw();
        assertEq(attacker.balance, 0);
    }

    function testWithdrawToken() public {
        vm.prank(user);
        address tokenAddress = factory.createToken("Test", "TEST", 100);
        EasyERC20 token = EasyERC20(tokenAddress);

        // contract receives token
        vm.prank(user);
        token.transfer(address(factory), 10);

        // owner withdraws token
        vm.prank(owner);
        factory.withdrawToken(tokenAddress);
        assertEq(token.balanceOf(owner), 11);
    }
}
