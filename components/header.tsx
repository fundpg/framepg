import * as React from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import { FPG_ICON_URL } from "@/lib/utils"
import { FaGithub } from "react-icons/fa";

import Image from "next/image";

export function Header() {
    return (
        <Card>
            <CardHeader>
                <div className="flex flex-row gap-2 items-center">
                    <Image src={FPG_ICON_URL} width={48} height={48} alt="FramePG" />
                    <CardTitle>FramePG</CardTitle>
                </div>
                <CardDescription>
                    View and donate to Gitcoin grant rounds inside of Farcaster frames
                    <br/>
                    <span className="font-medium">Choose a round below to get started!</span>
                </CardDescription>
                <div className="flex flex-row justify-between items-center">
                    <CardDescription className="text-sm pt-3">
                            Powered by <Link href="https://base.org" className="underline">Base</Link> and <Link href="https://frog.fm" className="underline">Frog</Link>
                    </CardDescription>
                    <Link href="https://github.com/fundpg/framepg" className="underline">
                        <FaGithub size={16} className="pt-1" />
                    </Link>
                </div> 
            </CardHeader>
        </Card>
    )
}