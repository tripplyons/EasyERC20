import { mainnet, polygon, optimism, arbitrum, bsc, polygonMumbai } from "wagmi/chains";

export const CHAINS = process.env.NEXT_PUBLIC_TESTNET === "1" ? [
  {
    name: "Polygon Mumbai",
    wagmi: polygonMumbai
  }
] : [
  {
    name: "Ethereum",
    wagmi: mainnet
  },
  {
    name: "Polygon",
    wagmi: polygon
  },
  {
    name: "Optimism",
    wagmi: optimism
  },
  {
    name: "Arbitrum",
    wagmi: arbitrum
  },
  {
    name: "BSC",
    wagmi: bsc
  }
]
