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
  initialState: {
    projectId: 0
  }
})

app.frame('/', async(c) => {
  const { buttonValue, status, deriveState } = c
  const url = new URL(c.req.url);
  const id = url.searchParams.get("id");
  const round = await fetchRound(`${id}`, 42161)

  const state: any = deriveState((previousState: any) => {
    if (buttonValue === 'reset') previousState.count = 0
    if(buttonValue === "inc") previousState.count++
    if (buttonValue === 'dec') previousState.count--
  })

  return c.res({
    image: (
      <div style={{ color: 'white', display: 'flex', flexDirection: "column", gap: 2, paddingLeft: '5%', fontSize: 60 }}>
        <p>
          GG20 | Round ID {id}
        </p>
        <p>
          {state.id.length === 0 ? round.data?.rounds[0].roundMetadata.name : 
          round.data?.rounds[0].applications[state.id].metadata.project.title}
        </p>
      </div>
    ),
    intents: state.id.length === 0 ? [
      <Button.Redirect location={`https://explorer.gitcoin.co/#/round/42161/${id}`}>View Round</Button.Redirect>,
       <Button value="inc">Explore Projects</Button>,
    ] : state.id.length > 0 ? [
      <Button.Redirect location={`https://explorer.gitcoin.co/#/round/42161/${id}/${state.id}`}>View Project</Button.Redirect>,
      <Button value="inc">Next</Button>,
      <Button value="dec">Back</Button>
    ] : [
      <Button value="inc">Next</Button>,
      <Button value="dec">Back</Button>
    ]
  })
})


devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)