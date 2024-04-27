// NOTE: this is all a WIP and not stable
// working on a solution since frame transactions don't support arbitrum
/** @jsxImportSource frog/jsx */

import fetchRound from '@/lib/fetchRound'
import { Button, Frog, TextInput, parseEther } from 'frog'
import { devtools } from 'frog/dev'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'

const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
})


// Uncomment to use Edge Runtime
// export const runtime = 'edge'

app.frame('/', async(c) => {
  const { buttonValue, inputText, status } = c
  //const fruit = inputText || buttonValue
  const amount = inputText || buttonValue
  const data = await fetchRound('26', 42161) as unknown as any;
  const applications = (data?.rounds as unknown as any)[0]?.applications;
  console.log(data);
  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background:
            status === 'response'
              ? 'linear-gradient(to right, #432889, #17101F)'
              : 'black',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: 60,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          {/* {status === 'response'
            ? `Nice choice.${fruit ? ` ${fruit.toUpperCase()}!!` : ''}`
            : 'Welcome!'} */}
          {status === 'response'
            ? `Donate:${amount ? ` ${amount.toUpperCase()}!!` : ''}`
            : 'Nice!'}
        </div>
      </div>
    ),
    intents: [
      <TextInput placeholder="Enter donation amount" />,
      <Button.Transaction target="/allocate"> Donate </Button.Transaction>,
      //status === 'response' && <Button.Reset>Reset</Button.Reset>,
      //status === 'response' && <Button.Transaction target="/mint"> Donate </Button.Transaction>,
    ],
  })
})

app.transaction('/allocate', (c) => {

  // return c.contract({
  //   to: mrcAddress,
  //   abi: MRC_ABI,
  //   functionName: 'allocate',
  //   chainId: `eip155:${chainId}`,
  //   args: [ BigInt(roundId), BigInt(inputText || ''), data],
  //   value: parseEther(inputText || '')
  // })
})


devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)