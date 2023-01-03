import Head from 'next/head'
import FontWrapper from '../components/FontWrapper'
import { NAME, DESCRIPTION } from '../content/metadata'
import MintingInterface from '../components/MintingInterface'

export default function Home() {
  return (
    <>
      <Head>
        <title>{NAME}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <FontWrapper>
          <div className='min-h-screen grid grid-cols-1 lg:grid-cols-2 p-10 bg-gray-200'>
            <div className='p-8 flex flex-col justify-center items-center'>
              <div className='p-8 flex flex-col justify-center items-center'>
                <h1 className='text-4xl font-medium text-center mb-2'><span className='text-blue-600'>Easy</span>ERC20</h1>
                <p className='text-center mb-8'>{DESCRIPTION}</p>
                <h2 className='text-lg font-medium text-bold mb-2'>Make your token with ease:</h2>
                <ol className='list-decimal list-inside'>
                  <li>
                    <strong className='font-bold'>Connect your wallet:</strong>
                    <p className='pl-8 max-w-md'>
                      Click the connect wallet button to start. Many wallets are supported.
                    </p>
                  </li>
                  <li>
                    <strong className='font-bold'>Design your token:</strong>
                    <p className='pl-8 max-w-md'>
                      Give your token a name, symbol, and total supply. You can choose which blockchain you want to deploy your token to.
                    </p>
                  </li>
                  <li>
                    <strong className='font-bold'>Launch your token:</strong>
                    <p className='pl-8 max-w-md'>
                      This will deploy a new token to the blockchain of your choice. You will have to pay a gas fee to do this. You will receive 95% of the tokens you create, and the remaining 5% will be kept as a service fee.
                    </p>
                  </li>
                </ol>
              </div>
            </div>
            <div className='flex flex-col justify-center items-center p-8'>
              <div className='shadow-xl rounded-3xl p-8 bg-gray-50 w-full h-full'>
                <MintingInterface />
              </div>
            </div>
          </div>
        </FontWrapper>
      </main >
    </>
  )
}
