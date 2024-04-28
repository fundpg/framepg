import { type GitcoinRound } from "@/lib/types";
import { Card, CardDescription, CardFooter, CardHeader } from "../ui/card";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import Link from "next/link";
import { type Round } from "@/hooks/useRounds";

export default function Round({ round }: { round: Round}){
    return(
        <Card key={round.id} className="flex flex-col justify-between">
            <CardHeader>{round.roundMetadata.name}</CardHeader>
            <CardFooter className="flex flex-col gap-1 items-start pb-3">
              <div className="flex flex-row gap-2 items-center">
                <FaArrowUpRightFromSquare size={12} />
                <Link href={`https://warpcast.com/~/compose?text=Donate to projects in GG25 round ${round.roundMetadata.name}! &embeds[]=https://framepg.xyz/api?id=${round.id}`} className="text-sm">
                  Share Frame
                </Link>
              </div>
            </CardFooter>
        </Card>
    )
}