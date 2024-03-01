/** @jsxImportSource frog/jsx */

import { rounds } from '@/lib/rounds'
import { GitcoinRound } from '@/lib/types'
import { DAIMO_BASE_URL, FPG_BANNER_URL } from '@/lib/utils'
import { Button, Frog, TextInput } from 'frog'
import { handle } from 'frog/vercel'

const app = new Frog({
  basePath: '/api',
  initialState: {
    currentProjectId: ''
  }
  // Supply a Hub API URL to enable frame verification.
  // hubApiUrl: 'https://api.hub.wevm.dev',
})

// Uncomment to use Edge Runtime
// export const runtime = 'edge'

app.frame('/', (c) => {
  const { buttonValue, inputText, status } = c
  const fruit = inputText || buttonValue
  return c.res({
    image: FPG_BANNER_URL,
    intents: [
      <Button.Redirect location="https://framepg.xyz">Website</Button.Redirect>,
    ],
  })
})

app.frame('/rounds/:id', (c) => {
  const { buttonValue, deriveState, initialPath } = c;
  // const roundId = initialPath.split('/')[2] ?? '';
  const roundId = '0xccbde000bd8006bab437f2efbe6ecb0a3eb334af';
  const roundDetails = rounds.find((round) => round.id === roundId) as GitcoinRound;

  return c.res({
    image: FPG_BANNER_URL,
    intents: [
      <Button>Round: {roundDetails.roundMetadata.name}</Button>,
      <Button.Redirect location={`/rounds/${roundId}`}>Projects</Button.Redirect>
    ]
  })
})

app.frame('/rounds/project/:id', (c) => {
  const { buttonValue, deriveState, initialPath } = c;
  const applicationId = String(initialPath.split('/')[4]) ?? '0';
  const roundId = '0xccbde000bd8006bab437f2efbe6ecb0a3eb334af';
  const roundDetails = rounds.find((round) => round.id === roundId) as GitcoinRound;
  const application = roundDetails.applications.find((app) => app.id === applicationId);

  return c.res({
    image: application?.image ?? FPG_BANNER_URL,
    intents: [
      <Button>{application?.name ?? ''}</Button>,
      <Button.Redirect location={`${DAIMO_BASE_URL}${application?.walletAddress}`}>Donate</Button.Redirect>
    ]
  })
})


export const GET = handle(app)
export const POST = handle(app)