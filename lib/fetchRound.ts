export interface RoundApplication {
    id: string;
    projectId: string;
    status: string;
    metadata: any;
    anchorAddress: string;
    project: {
      id: string;
      metadata: any;
      anchorAddress: string;
    };
  }
  
  export interface Round {
    id: string;
    chainId: number;
    uniqueDonorsCount: number;
    applicationsStartTime: string;
    applicationsEndTime: string;
    donationsStartTime: string;
    donationsEndTime: string;
    matchTokenAddress: string;
    roundMetadata: any;
    roundMetadataCid: string;
    applicationMetadata: any;
    applicationMetadataCid: string;
    strategyId: number;
    projectId: string;
    strategyAddress: string;
    strategyName: string;
    readyForPayoutTransaction: boolean;
    applications: RoundApplication[];
  }
  
  interface RoundData {
    rounds: Round[];
  }
  
  interface FetchRoundResult {
    data: RoundData | null;
    error: string | null;
  }
  
  async function fetchRound(roundId: string, chainId: number): Promise<FetchRoundResult> {
    try {
        const response = await fetch('https://grants-stack-indexer-v2.gitcoin.co/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'Origin': 'https://explorer.gitcoin.co',
            },
            body: JSON.stringify({
                query: `
                    query getRoundForExplorer($roundId: String!, $chainId: Int!) {
                        rounds(
                            first: 1
                            filter: { id: { equalTo: $roundId }, chainId: { equalTo: $chainId } }
                        ) {
                            id
                            chainId
                            uniqueDonorsCount
                            applicationsStartTime
                            applicationsEndTime
                            donationsStartTime
                            donationsEndTime
                            matchTokenAddress
                            roundMetadata
                            roundMetadataCid
                            applicationMetadata
                            applicationMetadataCid
                            strategyId
                            projectId
                            strategyAddress
                            strategyName
                            readyForPayoutTransaction
                            applications(first: 1000, filter: { status: { equalTo: APPROVED } }) {
                                id
                                projectId
                                status
                                metadata
                                anchorAddress
                                project {
                                  id
                                  metadata
                                  anchorAddress
                                }
                            }
                        }
                    }
                `,
                variables: {
                    roundId,
                    chainId
                }
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        return {
            data: result.data,
            error: null
        };
    } catch (error: any) {
        return {
            data: null,
            error: error.message
        };
    }
}

export default fetchRound;
  