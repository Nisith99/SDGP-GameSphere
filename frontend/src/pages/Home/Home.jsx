import Navbar from "../../Components/Navbar_";
import Feed from "../../Components/Feed"

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="max-w-2xl mx-auto mt-4 space-y-4">
        <Feed />
        <Feed />
        <Feed />
      </div>
    </div>
  );
}
