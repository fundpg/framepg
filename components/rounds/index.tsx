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
import { rounds } from "@/lib/rounds"
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

export default function Rounds(){
    const baseRounds: any[] = rounds.filter((round) => round.chainId === 8453);
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {baseRounds.map((round) => (
          <Card key={round.id} className="flex flex-col justify-between">
            <CardHeader>{round.roundMetadata.name}</CardHeader>
            <CardFooter className="flex flex-col gap-1 items-start pb-3">
              <CardDescription>{round.applications.length} applications</CardDescription>
              <div className="flex flex-row gap-2 items-center">
                <FaArrowUpRightFromSquare size={12} />
                <Link href={`/rounds/${round.id}`} className="text-sm">
                  View Details
                </Link>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
}