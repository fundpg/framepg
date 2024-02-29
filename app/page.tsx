import { Header } from "@/components/header";
import Rounds from "@/components/rounds";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-24">
      <Header />
      <Rounds />
    </main>
  );
}
