const hre = require("hardhat");

async function main() {
  const EasyERC20Factory = await hre.ethers.getContractFactory("EasyERC20Factory");
  const factory = await EasyERC20Factory.deploy(hre.ethers.constants.WeiPerEther);

  await factory.deployed();

  console.log("EasyERC20Factory deployed to:", factory.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
