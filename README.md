# EasyERC20
Create ERC20 tokens through an easy-to-use decentralized app

## Roadmap

### Implemented Features
- Factory contract
- Token contract
- Tests for contracts

### Unimplemented Features
- React frontend

## Development usage

### Installation

```shell
git clone https://github.com/tripplyons/EasyERC20.git
cd EasyERC20
npm install
```

### Running test cases

```shell
npx hardhat test
```

### Local Testnet Using [Hardhat Network](https://hardhat.org/hardhat-network/)

#### To start the testnet

```shell
npx hardhat node
```

#### To deploy an EasyERC20Factory to the testnet:

```shell
npx hardhat run --network localhost scripts/deploy.js
```
