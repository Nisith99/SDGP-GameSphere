import Notifications from "./components/Notifications"; // Import Notifications
import "./App.css";

function App() {
  const userId = "65a7f3c2b5d1234567890abc"; // Replace with real user ID

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      {/* App Title */}
      <h1 className="text-3xl font-bold text-blue-600 mb-4">GameSphere Notifications</h1>

      {/* Notification Section */}
      <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md">
        <Notifications userId={userId} />
      </div>
    </div>
  );
}

export default App;
