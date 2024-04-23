"use client";
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
import WarpcastIcon from "../icons/warpcast";
import Round from "./round";

export default function Rounds(){
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {rounds.map((round: any) => <Round round={round} key={round.id} />)}
      </div>
    );
}