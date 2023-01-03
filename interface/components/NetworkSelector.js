import { useNetwork } from 'wagmi'
import { useSwitchNetwork } from 'wagmi'
import { CHAINS } from '../content/deployments'

export default function NetworkSelector() {
  const network = useNetwork()
  const currentChain = network?.chain

  const { switchNetwork } = useSwitchNetwork()

  return (
    <div>
      <h3 className='font-medium text-lg'>Blockchain</h3>
      {CHAINS.map((chain, i) => (
        <div key={i}>
          <input
            type='radio'
            name='chain'
            id={chain.wagmi.id}
            value={chain.wagmi.id}
            checked={currentChain?.id === chain.wagmi.id}
            onChange={() => switchNetwork && switchNetwork(chain.wagmi.id)}
            className='mr-1'
          />
          <label htmlFor={chain.wagmi.id} className='mr-4'>{chain.name}</label>
        </div>
      ))}
    </div>
  )
}
