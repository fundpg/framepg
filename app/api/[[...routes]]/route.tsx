/** @jsxImportSource frog/jsx */

import { FPG_BANNER_URL } from '@/lib/utils'
import { Button, Frog, TextInput } from 'frog'
import { handle } from 'frog/vercel'

const app = new Frog({
  basePath: '/api',
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

export const GET = handle(app)
export const POST = handle(app)
