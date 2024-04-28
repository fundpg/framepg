/** @jsxImportSource frog/jsx */

import fetchRound from '@/lib/fetchRound'
import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'

const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  initialState: { id: 0, projectId: 0 }
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
})

// Uncomment to use Edge Runtime
// export const runtime = 'edge'

app.frame('/', async(c) => {
  const { buttonValue, status, deriveState } = c
  const url = new URL(c.req.url);
  const id = url.searchParams.get("id");

  const state: any = deriveState((previousState: any) => {
    if(previousState.id === 0) previousState.id = id ?? 20
    if(buttonValue === "inc") previousState.projectId++
    if (buttonValue === 'dec') previousState.projectId--
  })

  const round = await fetchRound(`${id}`, 42161)
  //const title = round.data?.rounds[0].applications[0].project.metadata.title || `Project ${state.projectId}`

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
          {state.projectId === 0 ? `View projects in ${round.data?.rounds[0].roundMetadata.name}` : `Project ${state.projectId}`}
        </div>
      </div>
    ),
    intents: state.projectId === 0 ? [
      <Button.Redirect location={`https://explorer.gitcoin.co/#/round/42161/${id || state.id}`}>View Round</Button.Redirect>,
      <Button value="inc">View Projects</Button>,
    ] : [
      <Button.Redirect location={`https://explorer.gitcoin.co/#/round/42161/${id || state.id}/${state.projectId}`}>Donate to Project</Button.Redirect>,
      <Button value="inc">Next</Button>,
      <Button value="dec">Back</Button>
    ]
  })
})

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)