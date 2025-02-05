import ChatInterface from "../components/store/ChatInterface";
import HistorySection from "@/components/store/HistorySection";

export default function Home() {
  return (
    <div className="grid grid-cols-8 gap-x-12 h-screen px-24 py-[10dvh]">
      <HistorySection/>
      <ChatInterface/>
    </div>
  );
}
