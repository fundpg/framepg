"use client"
import { rounds } from "@/lib/rounds";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FaArrowLeft } from "react-icons/fa";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { DAIMO_BASE_URL, FPG_BANNER_URL } from "@/lib/utils";
import Link from "next/link";
import { Metadata } from "next";
import { getFrameMetadata } from "frog/next";

export default function BaseRoundPage() {
  const router = useRouter();
  const pathname = usePathname();
  const pathnameParts = pathname.split('/');

  const id = pathnameParts[2];
  const roundDetails = rounds.filter((round) => round.id === id)[0];

  return (
    <div className="p-6">
      <button className="flex flex-row gap-2 items-center" onClick={() => router.back()}>
        <FaArrowLeft size={14} />
        <p className="text-sm">Back</p>
      </button>
      <div className="p-6 pt-0">
        <p className="text-xl font-medium pt-2">{roundDetails.roundMetadata.name}</p>
        <p className="pt-2">{roundDetails.roundMetadata.eligibility.description}</p>
        <div className="p-4 max-w-[90vw]">
          <p className="text-lg font-medium text-black/85 mb-3">Projects</p>
          <Carousel>
            <CarouselContent>
              {roundDetails.applications.map((project) => (
                <CarouselItem key={project.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="card-carousel-item">
                    <Card className="mb-4 w-full mx-auto">
                      <div className="flex flex-row justify-between pl-2 pr-2 items-center">
                        <CardHeader>{project.name}</CardHeader>
                        <Link className="underline" href={`${DAIMO_BASE_URL}${project.walletAddress}`}>
                          <p>Donate</p>
                        </Link>
                      </div>
                      <CardContent>
                        <CardDescription className="pb-2">{project.description}</CardDescription>
                        {project.image && (
                            <img src={project.image} alt={project.name} style={{ maxWidth: "12.5vw", height: "auto" }} className="rounded-xl" />
                        )}
                        <CardDescription className="pt-2 text-xs">{project.sdg}</CardDescription>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  );
}