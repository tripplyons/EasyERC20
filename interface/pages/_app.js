import '../styles/globals.css'
import { WagmiConfig, createClient } from "wagmi"
import { ConnectKitProvider, getDefaultClient } from "connectkit"
import { CHAINS } from "../content/deployments"

const client = createClient(
  getDefaultClient({
    appName: "EasyERC20",
    chains: CHAINS.map(chain => chain.wagmi)
  })
)

export default function App({ Component, pageProps }) {
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider theme="soft">
        <Component {...pageProps} />
      </ConnectKitProvider>
    </WagmiConfig>
  )
}
