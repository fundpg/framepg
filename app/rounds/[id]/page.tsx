"use client"
import { rounds } from "@/lib/rounds";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

export default function RoundPage(){
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
            <div className="p-6 pt-0">
                <p className="text-xl font-medium pt-2">{roundDetails.roundMetadata.name}</p>
                <p className="pt-2">{roundDetails.roundMetadata.eligibility.description}</p>
                <div className="pt-2">
                    <p>Projects</p>
                    {roundDetails.applications.map((project) => (
                        <div key={project.id} className="p-2 border-b border-gray-200">
                            <p className="font-medium">{project.id}</p>
                            <p className="font-medium">{project.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}