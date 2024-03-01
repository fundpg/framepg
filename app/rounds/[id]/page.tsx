import { Metadata } from "next";
import { getFrameMetadata } from "frog/next";
import { FPG_BANNER_URL } from "@/lib/utils";
import BaseRoundPage from "@/components/rounds/base-rounds-page";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const id = params.id
  const url = process.env.VERCEL_URL || 'http://localhost:3000'
  const frameMetadata = await getFrameMetadata(`${url}/api/rounds/${id}`)
  return {
    title: 'FramePG',
    description: 'View and donate to Gitcoin grant rounds inside of Farcaster frames',
    metadataBase: new URL("https://framepg.xyz"),
    openGraph: {images:[FPG_BANNER_URL]},
    other: frameMetadata,
  }
}

export default function RoundPage() {
  return <BaseRoundPage />
}