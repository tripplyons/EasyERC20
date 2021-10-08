# EasyERC20
Create ERC20 tokens through an easy-to-use decentralized app

## Roadmap

### Implemented Features
- Factory contract
- Token contract
- Tests for contracts
- React frontend
- Live networks
  - Polygon network (live and verified at [0xd65d608663616c3bdcd20c2e5e679ed1d8dc3f74](https://polygonscan.com/address/0xd65d608663616c3bdcd20c2e5e679ed1d8dc3f74))

### Unimplemented Features
- Live website
- Live networks
  - Ethereum (expensive to deploy to, so probably not anytime soon)
  - Arbitrum
  - BSC
  - Avalanche C-Chain

## Contract development usage

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

#### To deploy an EasyERC20Factory to the testnet

```shell
npx hardhat run --network localhost scripts/deploy.js
```

## Interface development usage


### Installation

```shell
cd interface
npm install
```

### Localhost server

```shell
npm run start
```
