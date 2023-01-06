import { mainnet, polygon, optimism, arbitrum, bsc, polygonMumbai } from "wagmi/chains";

export const FACTORY_ADDRESS = '0x169070404943a4df770beeb47a83063806f62597'

export const CHAINS = process.env.NEXT_PUBLIC_TESTNET === "1" ? [
  {
    name: "Polygon Mumbai",
    wagmi: polygonMumbai,
    explorer: 'https://mumbai.polygonscan.com/'
  }
] : [
  // {
  //   name: "Ethereum",
  //   wagmi: mainnet,
  //   explorer: 'https://etherscan.io/'
  // },
  {
    name: "Polygon",
    wagmi: polygon,
    explorer: 'https://polygonscan.com/'
  },
  // {
  //   name: "Optimism",
  //   wagmi: optimism,
  //   explorer: 'https://optimistic.etherscan.io/'
  // },
  // {
  //   name: "Arbitrum",
  //   wagmi: arbitrum,
  //   explorer: 'https://arbiscan.io/'
  // },
  // {
  //   name: "BSC",
  //   wagmi: bsc,
  //   explorer: 'https://bscscan.com/'
  // }
]
