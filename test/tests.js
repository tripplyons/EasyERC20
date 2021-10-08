const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("EasyERC20Factory", function () {

  const fee = ethers.constants.WeiPerEther;
  const name = "Name";
  const symbol = "SYMB";
  const supply = ethers.constants.WeiPerEther.mul(10);

  let EasyERC20Factory;

  // creates the token factory
  let owner;
  // creates the token
  let user;
  // tries to not pay the fee
  let maliciousActor;
  // other unused addresses
  let addrs;
  // the factory that is made
  let factory;
  // the token that is made
  let token;

  before(async function () {
    [owner, user, maliciousActor, ...addrs] = await ethers.getSigners();

    EasyERC20Factory = await ethers.getContractFactory("EasyERC20Factory", owner);
  });

  it("Should let the owner create a factory", async function () {
    factory = await EasyERC20Factory.deploy(fee);
    await factory.deployed();
  });

  it("Should have the right owner", async function() {
    expect(await factory.owner()).to.equal(owner.address);
  });

  it("Should have the right fee", async function() {
    expect(await factory.fee()).to.equal(fee);
  });

  it("Should reject transactions that don't pay enough of a fee", async function() {
    await expect(factory.connect(maliciousActor).createToken(name, symbol, supply, {value: 0})).to.be.reverted;
  });

  it("Should reject transactions that pay too large of a fee", async function() {
    await expect(factory.connect(user).createToken(name, symbol, supply, {value: fee.mul(2)})).to.be.reverted;
  });

  it("Should let a user create a token", async function() {
    let tx = await factory.connect(user).createToken(name, symbol, supply, {value: fee});
    let completedTx = await tx.wait();
    
    let event = completedTx.events.filter(event => event.event == 'TokenCreated')[0];
    
    expect(event.args.creatorAddress).to.equal(user.address);

    token = await ethers.getContractAt('ERC20', event.args.contractAddress);
  });

  it("Should reject transactions from other people that try to take the fee", async function() {
    await expect(factory.connect(maliciousActor).withdrawFees()).to.be.reverted;
  });

  it("Should let the owner take their fee", async function() {
    let oldBalance = await owner.getBalance();

    let tx = await factory.connect(owner).withdrawFees();
    await tx.wait();

    let newBalance = await owner.getBalance();

    expect(newBalance.gt(oldBalance)).to.equal(true);
  });
});
