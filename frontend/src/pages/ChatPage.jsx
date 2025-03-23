import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { Send, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const ChatPage = () => {
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const queryClient = useQueryClient();

  const [selectedChat, setSelectedChat] = useState(null);
  const [messageContent, setMessageContent] = useState("");

  // Fetch chat history
  const { data: chats, isLoading: chatsLoading } = useQuery({
    queryKey: ["chats"],
    queryFn: async () => {
      const res = await axiosInstance.get("/chats");
      return res.data;
    },
    enabled: !!authUser,
  });

  // Fetch user's connections
  const { data: connections } = useQuery({
    queryKey: ["connections"],
    queryFn: async () => {
      const res = await axiosInstance.get("/connections");
      return res.data;
    },
    enabled: !!authUser,
  });

  // Fetch suggested users
  const { data: suggestedUsers } = useQuery({
    queryKey: ["suggestedUsersForChat"],
    queryFn: async () => {
      const res = await axiosInstance.get("/users/suggestions");
      return res.data.suggestedUsers;
    },
    enabled: !!authUser,
  });

  // Send message mutation
  const { mutate: sendMessage } = useMutation({
    mutationFn: (data) => axiosInstance.post("/chats/send", data),
    onSuccess: () => {
      queryClient.invalidateQueries(["chats"]);
      setMessageContent("");
      toast.success("Message sent!");
    },
    onError: (error) => {
      toast.error("Failed to send message: " + error.message);
    },
  });

  const handleSendMessage = () => {
    if (!messageContent.trim() || !selectedChat) return;
    sendMessage({
      recipientId: selectedChat.user._id,
      content: messageContent,
    });
  };

  const handleStartChat = (user) => {
    const existingChat = chats?.find((chat) =>
      chat.user._id.toString() === user._id.toString()
    );
    setSelectedChat(existingChat || { user, messages: [] });
  };

  const renderChatHistory = () => {
    if (chatsLoading) return <p className="text-gray-600">Loading chats...</p>;

    // Get IDs of users with recent chats
    const chatUserIds = chats?.map((chat) => chat.user._id.toString()) || [];

    // Filter connections to exclude those with recent chats
    const filteredConnections = connections?.filter(
      (connection) => !chatUserIds.includes(connection._id.toString())
    );

    // Render Recent Chats
    const chatList = chats && chats.length > 0 ? (
      <div>
        <h3 className="text-sm font-semibold text-gray-600 mb-2">Recent Chats</h3>
        <ul className="space-y-2">
          {chats.map((chat) => (
            <li
              key={chat._id}
              className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
              onClick={() => setSelectedChat(chat)}
            >
              <div className="flex items-center">
                <img
                  src={chat.user.profilePicture || "/avatar.png"}
                  alt={chat.user.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-semibold">{chat.user.name}</p>
                  <p className="text-xs text-gray-500 truncate">
                    {chat.messages[chat.messages.length - 1]?.content || "No messages yet"}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    ) : null;

    return (
      <div>
        {chatList || (
          <div className="text-center py-4">
            <UserPlus size={48} className="mx-auto text-green-500 mb-4" />
            <p className="text-lg font-semibold text-gray-700">No chats yet</p>
            <p className="text-gray-500 mt-2">Start a chat with someone!</p>
          </div>
        )}
        {filteredConnections && filteredConnections.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Your Connections</h3>
            {filteredConnections.slice(0, 5).map((connection) => (
              <div
                key={connection._id}
                className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer"
                onClick={() => handleStartChat(connection)}
              >
                <img
                  src={connection.profilePicture || "/avatar.png"}
                  alt={connection.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-semibold">{connection.name}</p>
                  <p className="text-xs text-gray-500">@{connection.username}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        {suggestedUsers && suggestedUsers.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Suggested Players</h3>
            {suggestedUsers.slice(0, 3).map((user) => (
              <div
                key={user._id}
                className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer"
                onClick={() => handleStartChat(user)}
              >
                <img
                  src={user.profilePicture || "/avatar.png"}
                  alt={user.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-xs text-gray-500">@{user.username}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderChatWindow = () => {
    if (!selectedChat) return null;

    return (
      <div className="flex-1 flex flex-col">
        <div className="p-4 bg-gray-100 border-b border-gray-200 flex items-center">
          <img
            src={selectedChat.user.profilePicture || "/avatar.png"}
            alt={selectedChat.user.name}
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <p className="font-semibold">{selectedChat.user.name}</p>
            <p className="text-xs text-gray-500">@{selectedChat.user.username}</p>
          </div>
        </div>
        <div className="flex-1 p-4 overflow-y-auto">
          {selectedChat.messages.length > 0 ? (
            selectedChat.messages.map((msg) => (
              <div
                key={msg._id}
                className={`mb-2 flex ${
                  msg.sender.toString() === authUser._id.toString() ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg ${
                    msg.sender.toString() === authUser._id.toString()
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  <p>{msg.content}</p>
                  <p className="text-xs mt-1 opacity-75">
                    {new Date(msg.createdAt).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No messages yet. Say hi!</p>
          )}
        </div>
        <div className="p-4 border-t border-gray-200 flex items-center">
          <input
            type="text"
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleSendMessage}
            className="p-2 bg-green-500 text-white rounded-r-lg hover:bg-green-600"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 container mx-auto py-8 px-4">
        <div className="col-span-1 lg:col-span-1">
          <Sidebar user={authUser} />
        </div>
        <div className="col-span-1 lg:col-span-3">
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 flex">
            <div className="w-1/3 border-r border-gray-200 pr-4">
              <h2 className="text-xl font-bold mb-4">Chats</h2>
              {renderChatHistory()}
            </div>
            <div className="w-2/3 pl-4">{renderChatWindow()}</div>
          </div>
        </div>
      </div>
      <footer className="mt-8 pb-6">
        <div className="max-w-md mx-auto px-4 text-center text-xs text-gray-500">
          <div className="mt-3 space-x-4">
            <a href="#" className="hover:text-gray-700">Help Center</a>
            <a href="#" className="hover:text-gray-700">Privacy & Terms</a>
            <a href="#" className="hover:text-gray-700">Accessibility</a>
          </div>
          <p className="mt-4">
            GameSphere © {new Date().getFullYear()} | The Ultimate Sports Gaming Platform
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ChatPage;