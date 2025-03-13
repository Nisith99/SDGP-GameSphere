import Navbar from "../../Components/Navbar";
import Feed from "../../Components/Feed"
import AvailabilityCard from "../../Components/AvailabilityCard";
import { Footer } from "../../Components/footer";

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Availability Card - Positioned Below Navbar */}
      <div className="flex justify-center">
        <AvailabilityCard />
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto mt-4 space-y-4">
        <Feed />   
      </div>
      <Footer />
    </div>
  );
}
