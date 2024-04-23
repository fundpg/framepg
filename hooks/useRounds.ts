"use client";
import React from 'react';

export interface Round {
  id: string;
  chainId: number;
  tags: string[];
  roundMetadata: any;
  roundMetadataCid: string;
  applicationsStartTime: string;
  applicationsEndTime: string;
  donationsStartTime: string;
  donationsEndTime: string;
  matchAmountInUsd: string;
  matchAmount: string;
  matchTokenAddress: string;
  strategyId: number;
  strategyName: string;
  strategyAddress: string;
  applications: { id: string }[];
}

interface RoundsData {
  rounds: Round[];
}

interface UseRoundsResult {
  data: RoundsData | null;
  loading: boolean;
  error: string | null;
}

const useRounds = () => {
  const [data, setData] = React.useState<RoundsData | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function fetchRounds() {
      setLoading(true);
      setError(null);

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
              query GetRounds(
                $first: Int
                $orderBy: [RoundsOrderBy!]
                $filter: RoundFilter
              ) {
                rounds(first: $first, orderBy: $orderBy, filter: $filter) {
                  id
                  chainId
                  tags
                  roundMetadata
                  roundMetadataCid
                  applicationsStartTime
                  applicationsEndTime
                  donationsStartTime
                  donationsEndTime
                  matchAmountInUsd
                  matchAmount
                  matchTokenAddress
                  strategyId
                  strategyName
                  strategyAddress
                  applications(first: 1000, filter: { status: { equalTo: APPROVED } }) {
                    id
                  }
                }
              }
            `,
            variables: {
              orderBy: "MATCH_AMOUNT_IN_USD_DESC",
              chainIds: [1, 10, 424, 42161, 43114, 137, 324, 8453, 534352, 250, 713715],
              first: 100,
              filter: {
                and: [
                  {
                    or: [
                      {
                        donationsStartTime: { lessThan: "2024-04-20T01:23:29.617Z" },
                        donationsEndTime: { greaterThan: "2024-04-20T01:23:29.617Z", lessThan: "3023-08-22T01:23:29.617Z" }
                      },
                      {
                        applicationsStartTime: { lessThanOrEqualTo: "2024-04-20T01:23:29.617Z" },
                        applicationsEndTime: { greaterThanOrEqualTo: "2024-04-20T01:23:29.617Z" }
                      }
                    ]
                  },
                  {
                    or: { chainId: { in: [1, 10, 424, 42161, 43114, 137, 324, 8453, 534352, 250, 713715] } }
                  },
                  {
                    or: { tags: { contains: "allo-v2" } }
                  }
                ]
              }
            }
          })
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        console.log('data', result.data);
        setData(result.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchRounds();
  }, []);

  return { data, loading, error };
}

export default useRounds;
