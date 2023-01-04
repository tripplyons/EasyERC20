import { ConnectKitButton } from "connectkit"
import NetworkSelector from "./NetworkSelector"
import { useAccount } from 'wagmi'
import { useEffect, useState } from "react"

export default function MintingInterface() {
  const { isConnected } = useAccount()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  // fixes hydration issue
  if (!loaded) {
    return null
  }

  return (
    <>
      <h2 className='text-xl font-medium text-bold mb-2'>1. Connect your wallet</h2>
      <ConnectKitButton />

      {
        isConnected ? (
          <>
            <h2 className='text-xl font-medium text-bold mb-2 mt-4'>2. Design your token</h2>
            <form onSubmit={e => e.preventDefault()}>
              <NetworkSelector />
            </form>
            <h2 className='text-xl font-medium text-bold mb-2 mt-4'>3. Launch your token</h2>
          </>
        ) : (
          <p className='text-gray-500 mt-2'>Connect your wallet to a supported network to continue</p>
        )
      }
    </>

  )
}
