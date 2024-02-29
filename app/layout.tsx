import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'FramePG',
  description: 'View and donate to Gitcoin grant rounds inside of Farcaster frames',
  metadataBase: new URL("https://framepg.xyz"),
  openGraph: {images:["https://i.imgur.com/46gjErq.png"]}
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
