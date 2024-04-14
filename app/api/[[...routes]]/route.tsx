/** @jsxImportSource frog/jsx */

import { rounds } from '@/lib/rounds'
import { GitcoinRound } from '@/lib/types'
import { DAIMO_BASE_URL, FPG_BANNER_URL } from '@/lib/utils'
import { Button, Frog, TextInput, parseEther } from 'frog'
import { handle } from 'frog/vercel'
import {
  Hex,
  InternalRpcError,
  parseAbi,
  parseUnits,
  SwitchChainError,
  UserRejectedRequestError,
  zeroAddress,
} from "viem";
import { groupBy, uniq } from "lodash-es";
import { CartProject, ProgressStatus } from "../../../features/api/types";
import { useCartStorage } from "../../../lib/store";




import { getConfig } from '../../../lib/config';

import {
  encodeQFVotes,
  encodedQFAllocation,
  signPermit2612,
  signPermitDai,
} from "../../../features/api/voting";
import { MRC_CONTRACTS } from "../../../lib/addresses/mrc";



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

const isV2 = getConfig().allo.version === "allo-v2";


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
      <Button.Transaction target="/mint" >Donate</Button.Transaction>,
    ]
  })
})

app.transaction('/mint', (c) => {

  const { inputText } = c
  const chainID = 10;
  // Contract transaction response.

  const chainIdsToCheckOut = [chainID]


  const projectsToCheckOut = useCartStorage
        .getState()
        .projects.filter((project) =>
          chainIdsToCheckOut.includes(project.chainId)
        );

  const projectsByChain = groupBy(projectsToCheckOut, "chainId") as {
    [chain: number]: CartProject[];
  };

  const donations = projectsByChain[chainID];

  const getVotingTokenForChain =
        useCartStorage.getState().getVotingTokenForChain;

  const token = getVotingTokenForChain(chainID);

  const groupedDonations = groupBy(
    donations.map((d) => ({
      ...d,
      roundId: d.roundId,
    })),
    "roundId"
  );

  const groupedEncodedVotes: Record<string, Hex[]> = {};
  for (const roundId in groupedDonations) {
    groupedEncodedVotes[roundId] = isV2
      ? encodedQFAllocation(token, groupedDonations[roundId])
      : encodeQFVotes(token, groupedDonations[roundId]);
  }

  const mrcAddress = MRC_CONTRACTS[chainID];

  const poolIds = Object.keys(groupedEncodedVotes).flatMap((key) => {
    const count = groupedEncodedVotes[key].length;
    return new Array(count).fill(key);
  });
  const data = Object.values(groupedEncodedVotes).flat();

  return c.contract({
      abi: MRC_ABI,
      chainId: `eip155:${chainID}`,
      functionName: 'allocate',
      args: [ poolIds, inputText, data],
      to: mrcAddress,
      value: parseEther(inputText || '')
  })
})




export const GET = handle(app)
export const POST = handle(app)