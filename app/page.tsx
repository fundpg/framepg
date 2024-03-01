import { Header } from "@/components/header";
import Rounds from "@/components/rounds";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 ml-[10%] md:ml-[20%]">
      <div className="flex flex-col items-start gap-10">
        <Header />
        <Rounds />
      </div>
    </main>
  );
}