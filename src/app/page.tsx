import Hero from "@/Components/Hero";
import Topbar from "@/Components/Topbar";

export default function Home() {
  return (
    <div className="bg-[#010010] flex flex-col w-full min-h-screen">
      <Topbar />
      <Hero />
    </div>
  );
}
