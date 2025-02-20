import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Notifications from "./components/Notifications"; // Import Notifications

function App() {
  const [count, setCount] = useState(0);
  const userId = "65a7f3c2b5d1234567890abc"; // Replace with real user ID

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {/* Logo Section */}
      <div className="flex items-center space-x-4 mb-6">
        <img src={viteLogo} className="h-16" alt="Vite logo" />
        <img src={reactLogo} className="h-16 animate-spin" alt="React logo" />
      </div>

      {/* Heading */}
      <h1 className="text-3xl font-bold underline">Hello world!</h1>

      {/* Counter Button */}
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-800"
        onClick={() => setCount(count + 1)}
      >
        Count: {count}
      </button>

      {/* Notification Section */}
      <Notifications userId={userId} />
    </div>
  );
}

export default App;
