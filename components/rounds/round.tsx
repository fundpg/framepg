import { type GitcoinRound } from "@/lib/types";
import { Card, CardDescription, CardFooter, CardHeader } from "../ui/card";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import Link from "next/link";
import { Round } from "@/hooks/useRounds";

export default function Round({ round }: { round: Round}){
    return(
        <Card key={round.id} className="flex flex-col justify-between">
            <CardHeader>{round.roundMetadata.name}</CardHeader>
            <CardFooter className="flex flex-col gap-1 items-start pb-3">
              <CardDescription>{round.applications.length} applications</CardDescription>
              <div className="flex flex-row gap-2 items-center">
                <FaArrowUpRightFromSquare size={12} />
                {/* <Link href={`/rounds/${round.id}`} className="text-sm"> */}
                <Link href={`https://explorer.gitcoin.co/#/round/42161/${round.id}`} className="text-sm">
                  View Details
                </Link>
              </div>
            </CardFooter>
        </Card>
    )
}