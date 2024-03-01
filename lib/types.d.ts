export type GitcoinRound = {
  id: string;
  chainId: number;
  tags: string[];
  roundMetadata: {
    name: string;
    support: {
      info: string;
      type: string;
    };
    roundType: string;
    eligibility: {
      description: string;
      requirements: {
        requirement: string;
      }[];
    };
    feesAddress: string;
    feesPercentage: number;
    programContractAddress: string;
    quadraticFundingConfig: {
      matchingCap: boolean;
      sybilDefense: boolean;
      minDonationThreshold: boolean;
      matchingFundsAvailable: number;
    };
  };
  roundMetadataCid: string;
  applicationsStartTime: string;
  applicationsEndTime: string;
  donationsStartTime: string;
  donationsEndTime: string;
  matchAmountInUsd: number;
  matchAmount: string;
  matchTokenAddress: string;
  strategyId: string;
  strategyName: string;
  strategyAddress: string;
  applications: {
    id: string;
    name: string;
    description: string;
    sdg: string;
    walletAddress: string;
    teamSize: string;
    image: string;
  }[];
};