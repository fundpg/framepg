import { getFrameMetadata } from 'frog/next'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { FPG_BANNER_URL } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })
 
export async function generateMetadata(): Promise<Metadata> {
  const url = process.env.VERCEL_URL || 'http://localhost:3000'
  const frameMetadata = await getFrameMetadata(`${url}/api`)
  return {
    title: 'FramePG',
    description: 'View and donate to Gitcoin grant rounds inside of Farcaster frames',
    metadataBase: new URL("https://framepg.xyz"),
    openGraph: {images:[FPG_BANNER_URL]},
    other: frameMetadata,
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
