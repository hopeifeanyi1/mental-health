import ChatInterface from "../components/store/ChatInterface";
import HistorySection from "@/components/store/HistorySection";
import Nav from "@/components/store/Nav";

export default function Home() {
  return (
    <div className="grid grid-cols-8 gap-x-12 h-[100dvh] lg:px-24 lg:py-[10dvh] p-0">
      <Nav/>
      <HistorySection/>
      <ChatInterface/>
    </div>
  );
}
