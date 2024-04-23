// NOTE: this is all a WIP and not stable
// working on a solution since frame transactions don't support arbitrum
/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput, parseEther } from 'frog'
import { devtools } from 'frog/dev'
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'
import { MRC_CONTRACTS } from '../../lib/addresses/mrc'
import { rounds, GitcoinRound } from '../../lib/rounds'

import { Hex } from "viem"
import {
  encodeQFVotes,
  encodedQFAllocation
} from '../../features/api/voting';
import { groupBy, uniq } from "lodash-es";
import { getConfig } from '../../lib/config';
import { useCartStorage } from "../../lib/store";
import { CartProject } from "../../common/types";
import { number } from 'zod'

const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  // initialState: {
  //   currentProjectId: ''
  // }
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
})

const MRC_ABI = [
  {
      inputs: [
        {internalType: "uint256", name: "_poolId", type: "uint256" },
        {internalType: "uint256", name: "_amount", type: "uint256"},
        {internalType: "bytes[]", name: "_data", type: "bytes[]"}
      ],
      name: "allocate",
      outputs: [],
      stateMutability: "payable",
      type: "function"
  },
] as const

//const isV2 = getConfig().allo.version === "allo-v2";


// Uncomment to use Edge Runtime
// export const runtime = 'edge'

app.frame('/', (c) => {
  const { buttonValue, inputText, status } = c
  //const fruit = inputText || buttonValue
  const amount = inputText || buttonValue
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
      //<TextInput placeholder="Enter custom fruit..." />,
      <TextInput placeholder="Enter donation amount..." />,
      // <Button value="apples">Apples</Button>,
      // <Button value="oranges">Oranges</Button>,
      // <Button value="bananas">Bananas</Button>,
      //<Button value="donation">Check</Button>,
      //<Button.Redirect location="https://framepg.xyz">Website</Button.Redirect>,
      <Button.Transaction target="/allocate"> Donate </Button.Transaction>,

      //status === 'response' && <Button.Reset>Reset</Button.Reset>,
      //status === 'response' && <Button.Transaction target="/mint"> Donate </Button.Transaction>,
    ],
  })
})

// //transaction routes
// const abi = [
//   {
//       inputs: [{ internalType: "string", name: "uri", type: "string" }],
//       name: "mint",
//       outputs: [],
//       stateMutability: "payable",
//       type: "function"
//   },
// ] as const

app.transaction('/allocate', (c) => {
  // Contract transaction response.
  // https://explorer.gitcoin.co/#/round/10/5/3

  const chainId = 10; //OP
  const roundId = '5' ; //Mission 1 OP
  const projectId = 5; //Ethereal Resonance
  const mrcAddress = MRC_CONTRACTS[chainId];
  console.log("mrcAddress:", mrcAddress);
  const { inputText } = c;

  //working on retriving this data without the cart
  const grantApplicationId = '';
  const projectRegistryId = '';
  const anchorAddress = '';
  const recipient = '';
  const projectMetadata = '' as ProjectMetadata;
  const grantApplicationFormAnswers = [''] as GrantApplicationFormAnswer;
  const applicationStatus = '' as ApplicationStatus;
  const applicationIndex = 10;

  //const isV2 = getConfig().allo.version === "allo-v2";
  console.log("constants done");
  const project = {
    grantApplicationId: grantApplicationId,
    projectRegistryId: projectRegistryId,
    anchorAddress: anchorAddress,
    recipient: recipient,
    projectMetadata: projectMetadata,
    grantApplicationFormAnswers: grantApplicationFormAnswers,
    status: applicationStatus,
    applicationIndex: applicationIndex,
    roundId: roundId,
    chainId: chainId,
    amount: inputText,
  } as CartProject;

  console.log('project:', project)

  // export type Project = {
  //   grantApplicationId: string;
  //   projectRegistryId: string;
  //   anchorAddress?: string;
  //   recipient: string;
  //   projectMetadata: ProjectMetadata;
  //   grantApplicationFormAnswers: GrantApplicationFormAnswer[];
  //   status: ApplicationStatus;
  //   applicationIndex: number;
  // };

  // export type CartProject = Project & {
  //   roundId: string;
  //   chainId: ChainId;
  //   amount: string;
  // };
  
  const projectsByChain: { [chain: number]: CartProject[] } = { [chainId]: [project] };
  console.log('projectsByChain', projectsByChain)
  
  const donations = projectsByChain[chainId];
  console.log('donations', donations);

  const getVotingTokenForChain =
    useCartStorage.getState().getVotingTokenForChain;
  
  console.log('getVotingTokenForChain', getVotingTokenForChain);
  const token = getVotingTokenForChain(chainId);
  console.log('token', token);

  const groupedDonations = groupBy(
    donations.map((d) => ({
      ...d,
      roundId: d.roundId,
    })),
    "roundId"
  );
  console.log('groupedDonations', groupedDonations)

  const groupedEncodedVotes: Record<string, Hex[]> = {};
  {
    groupedEncodedVotes[roundId] = encodedQFAllocation(token, groupedDonations[roundId])
  }
  console.log('groupedEncodedVotes', groupedEncodedVotes);

  const data = Object.values(groupedEncodedVotes).flat();
  console.log(data);

  return c.contract({
    to: mrcAddress,
    abi: MRC_ABI,
    functionName: 'allocate',
    chainId: `eip155:${chainId}`,
    args: [ BigInt(roundId), BigInt(inputText || ''), data],
    value: parseEther(inputText || '')
  })
})

// app.transaction('/mint', (c) => {
//   const { inputText } = c
//   const chainID = 10;

//   const chainIdsToCheckOut = [chainID]

//   const projectsToCheckOut = useCartStorage
//         .getState()
//         .projects.filter((project) =>
//           chainIdsToCheckOut.includes(project.chainId)
//         );

//   const projectsByChain = groupBy(projectsToCheckOut, "chainId") as {
//     [chain: number]: CartProject[];
//   }

//   const donations = projectsByChain[chainID];

//   const groupedDonations = groupBy(
//     donations.map((d) => ({
//       ...d,
//       roundId: d.roundId,
//     })),
//     "roundId"
//   );

//   const getVotingTokenForChain =
//         useCartStorage.getState().getVotingTokenForChain;


//   const token = getVotingTokenForChain(chainID);


//   const groupedEncodedVotes: Record<string, Hex[]> = {};
//   for (const roundId in groupedDonations) {
//     groupedEncodedVotes[roundId] = isV2
//       ? encodedQFAllocation(token, groupedDonations[roundId])
//       : encodeQFVotes(token, groupedDonations[roundId]);
//   }

//   const data = Object.values(groupedEncodedVotes).flat();

//   const mrcAddress = MRC_CONTRACTS[chainID];

  
//   return c.contract({
//     abi: MRC_ABI,
//     chainId: `eip155:${chainID}`,
//     functionName: 'allocate',
//     args: [ BigInt('poolIds'), BigInt(inputText || '0'), data],
//     to: mrcAddress,
//     value: parseEther(inputText || '')
// })
// })


devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)