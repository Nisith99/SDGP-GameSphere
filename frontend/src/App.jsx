import Navbar from "./Components/Navbar";
import Feed from "./Components/Feed";

export default function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="max-w-2xl mx-auto p-4 space-y-4">
        <Feed />
        <Feed />
      </div>
    </div>
  );
}
