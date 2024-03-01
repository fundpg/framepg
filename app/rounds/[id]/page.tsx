"use client"
import { rounds } from "@/lib/rounds2";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";


export default function RoundPage() {
    const router = useRouter()
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
            <Carousel showArrows={true} autoPlay={false} infiniteLoop={true}>
                {roundDetails.applications.map((project) => (
                    <div key={project.id} className="card-carousel-item">
                        <Card className="mb-4 w-1/2 mx-auto">
                            <CardHeader>{project.name}</CardHeader>
                            <CardContent>
                                <CardDescription>{project.description}</CardDescription>
                                {project.image && (
                                    <img src={project.image} alt={project.name} style={{ maxWidth: "100%", height: "auto" }} />
                                )}
                                <CardDescription>{project.sdg}</CardDescription>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </Carousel>
        </div>
    );
    // return (
    //     <div className="p-6">
    //         <button className="flex flex-row gap-2 items-center" onClick={() => router.back()}>
    //             <FaArrowLeft size={14} />
    //             <p className="text-sm">Back</p>
    //         </button>
    //         <div className="p-6 pt-0">
    //             <p className="text-xl font-medium pt-2">{roundDetails.roundMetadata.name}</p>
    //             <p className="pt-2">{roundDetails.roundMetadata.eligibility.description}</p>
    //             <div className="pt-2">
    //                 <p>Projects</p>
    //                 {roundDetails.applications.map((project) => (
    //                     <div key={project.id} className="p-2 border-b border-gray-200">
    //                         <p className="font-medium">{project.name}</p>
    //                         <p className="font-medium">{project.sdg}</p>
    //                         <p>{project.description}</p>
    //                         {project.image && (
    //                             <img src={project.image} alt={project.name} style={{ maxWidth: "100%", height: "auto" }} />
    //                         )}
    //                     </div>
    //                 ))}
    //             </div>
    //         </div>
    //     </div>
    // );

    // return (
    //     <div className="p-6">
    //         <button className="flex flex-row gap-2 items-center" onClick={() => router.back()}>
    //             <FaArrowLeft size={14} />
    //             <p className="text-sm">Back</p>
    //         </button>
    //         <div className="p-6 pt-0">
    //             <p className="text-xl font-medium pt-2">{roundDetails.roundMetadata.name}</p>
    //             <p className="pt-2">{roundDetails.roundMetadata.eligibility.description}</p>
    //             <div className="pt-2">
    //                 <p>Projects</p>
    //                 {roundDetails.applications.map((project) => (
    //                     <div key={project.id} className="p-2 border-b border-gray-200">
    //                         <p className="font-medium">{project.id}</p>
    //                         <p className="font-medium">{project.name}</p>
    //                     </div>
    //                 ))}
    //             </div>
    //         </div>
    //     </div>
    // )
}