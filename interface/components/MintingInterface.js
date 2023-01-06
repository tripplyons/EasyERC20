import { ConnectKitButton } from "connectkit"
import NetworkSelector from "./NetworkSelector"
import { useAccount } from 'wagmi'
import { useEffect, useState } from "react"
import TextInput from "./TextInput"
import NumberInput from "./NumberInput"
import Button from "./Button"
import { writeContract } from '@wagmi/core'
import { FACTORY_ADDRESS } from "../content/deployments"
import { FACTORY_ABI } from '../content/factoryABI'
import { useNetwork } from 'wagmi'
import { CHAINS } from '../content/deployments'
import Link from "./Link"

export default function MintingInterface() {
  const { isConnected } = useAccount()
  const [loaded, setLoaded] = useState(false)
  const [name, setName] = useState('')
  const [symbol, setSymbol] = useState('')
  const [supply, setSupply] = useState('0')
  const [waiting, setWaiting] = useState(false)
  const [tokenAddress, setTokenAddress] = useState('')
  const network = useNetwork()
  const currentChain = network?.chain
  const explorer = CHAINS.find(chain => chain.wagmi.id === currentChain?.id)?.explorer
  const deployed = tokenAddress.length > 0

  useEffect(() => {
    setLoaded(true)
  }, [])

  // fixes hydration issue
  if (!loaded) {
    return null
  }

  let valid = true
  if (name.length == 0) {
    valid = false
  }
  if (symbol.length == 0) {
    valid = false
  }
  if (supply <= 0) {
    valid = false
  }

  async function deploy() {
    console.log('deploying token')
    setWaiting(true)
    const tx = await writeContract({
      mode: 'recklesslyUnprepared',
      address: FACTORY_ADDRESS,
      abi: FACTORY_ABI,
      functionName: 'createToken',
      args: [name, symbol, supply + "0".repeat(18)]
    })
    const data = await tx.wait()
    const logs = data.logs
    const event = logs.find(log => log.topics[0] == "0xb31d54f51f4215e2cdef04df8781d96a5593bb63d6e226e9833ee52bdba85319")

    setTokenAddress('0x' + event.topics[1].slice(-40))
    setWaiting(false)
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
              <div className='grid md:grid-cols-2 gap-4'>
                <TextInput label='Name' value={name} disabled={deployed || waiting} onChange={value => {
                  setName(value)
                }} />
                <TextInput label='Symbol' value={symbol} disabled={deployed || waiting} onChange={value => {
                  setSymbol(value)
                }} />
                <NumberInput label='Supply' value={supply} disabled={deployed || waiting} onChange={value => {
                  setSupply(value)
                }} />
              </div>
            </form>
            <h2 className='text-xl font-medium text-bold mb-2 mt-4'>3. Launch your token</h2>
            {
              valid ? (
                waiting ? (
                  <p className='text-gray-500 mt-2'>Waiting for your transaction to be mined...</p>
                ) : (
                  deployed ? (
                    <>
                      <p className="mt-2">Your token is now live!</p>
                      <p className="mt-2">
                        Token address:{' '}
                        <Link href={explorer + 'token/' + tokenAddress}>
                          {tokenAddress}
                        </Link>
                      </p>
                    </>
                  ) : (
                    <Button onClick={deploy}>Deploy</Button>
                  )
                )
              ) : (
                <p className='text-gray-500 mt-2'>Fill out all fields to continue</p>
              )
            }
          </>
        ) : (
          <p className='text-gray-500 mt-2'>Connect your wallet to a supported network to continue</p>
        )
      }
    </>

  )
}
