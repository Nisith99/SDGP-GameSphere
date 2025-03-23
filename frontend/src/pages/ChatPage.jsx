import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";
import { useState, useRef, useEffect } from "react";
import { Send, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const ChatPage = () => {
    const { data: authUser, isLoading: authLoading } = useQuery({ queryKey: ["authUser"] });
    const queryClient = useQueryClient();

    const [selectedChat, setSelectedChat] = useState(null);
    const [messageContent, setMessageContent] = useState("");
    const messagesEndRef = useRef(null);

    const { data: chats, isLoading: chatsLoading } = useQuery({
        queryKey: ["chats"],
        queryFn: async () => {
            const res = await axiosInstance.get("/chats");
            return res.data;
        },
        enabled: !!authUser,
        onSuccess: (data) => {
            if (selectedChat) {
                const updatedChat = data.find(
                    (chat) => chat?.user?._id?.toString() === selectedChat?.user?._id?.toString()
                );
                if (updatedChat) setSelectedChat(updatedChat);
            }
        },
    });

    const { data: connections } = useQuery({
        queryKey: ["connections"],
        queryFn: async () => {
            const res = await axiosInstance.get("/connections");
            return res.data;
        },
        enabled: !!authUser,
    });

    const { data: suggestedUsers } = useQuery({
        queryKey: ["suggestedUsersForChat"],
        queryFn: async () => {
            const res = await axiosInstance.get("/users/suggestions");
            return res.data.suggestedUsers;
        },
        enabled: !!authUser,
    });

    const { mutate: sendMessage, isPending: isSending } = useMutation({
        mutationFn: (data) => axiosInstance.post("/chats/send", data),
        onSuccess: (response) => {
            if (selectedChat) {
                const newMessage = {
                    _id: response.data._id || Date.now().toString(),
                    sender: authUser?._id,
                    content: messageContent,
                    createdAt: new Date().toISOString(),
                };
                setSelectedChat((prev) => ({
                    ...prev,
                    messages: [...(prev?.messages || []), newMessage],
                }));
            }
            queryClient.invalidateQueries(["chats"]);
            setMessageContent("");
            toast.success("Message sent!");
        },
        onError: (error) => {
            toast.error("Failed to send message: " + (error.message || "Unknown error"));
        },
    });

    const handleSendMessage = () => {
        if (!messageContent.trim() || !selectedChat || isSending) return;
        sendMessage({
            recipientId: selectedChat?.user?._id,
            content: messageContent,
        });
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSendMessage();
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [selectedChat?.messages]);

    const handleStartChat = (user) => {
        const existingChat = chats?.find((chat) =>
            chat?.user?._id?.toString() === user?._id?.toString()
        );
        setSelectedChat(existingChat || { user, messages: [] });
    };

    const renderChatHistory = () => {
        if (chatsLoading || authLoading) return <p className="text-gray-600">Loading chats...</p>;

        const chatUserIds = chats?.map((chat) => chat?.user?._id?.toString()) || [];
        const filteredConnections = connections?.filter(
            (connection) => !chatUserIds.includes(connection?._id?.toString())
        );

        const chatList = chats && chats.length > 0 ? (
            <div>
                <h3 className="text-sm font-semibold text-gray-600 mb-2">Recent Chats</h3>
                <ul className="space-y-2">
                    {chats.map((chat) => (
                        <li
                            key={chat?._id}
                            className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                            onClick={() => handleStartChat(chat?.user)}
                        >
                            <div className="flex items-center">
                                <img
                                    src={chat?.user?.profilePicture || "/avatar.png"}
                                    alt={chat?.user?.name || "User"}
                                    className="w-10 h-10 rounded-full mr-3"
                                />
                                <div>
                                    <p className="font-semibold">{chat?.user?.name || "Unknown User"}</p>
                                    <p className="text-xs text-gray-500 truncate">
                                        {chat?.messages?.length > 0
                                            ? chat.messages[chat.messages.length - 1]?.content || "No messages yet"
                                            : "No messages yet"}
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        ) : null;

        return (
            <div className="h-full overflow-y-auto">
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
                        <div className="max-h-40 overflow-y-auto">
                            {filteredConnections.map((connection) => (
                                <div
                                    key={connection?._id}
                                    className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer"
                                    onClick={() => handleStartChat(connection)}
                                >
                                    <img
                                        src={connection?.profilePicture || "/avatar.png"}
                                        alt={connection?.name || "User"}
                                        className="w-10 h-10 rounded-full mr-3"
                                    />
                                    <div>
                                        <p className="font-semibold">{connection?.name || "Unknown User"}</p>
                                        <p className="text-xs text-gray-500">@{connection?.username || "unknown"}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {suggestedUsers && suggestedUsers.length > 0 && (
                    <div className="mt-4">
                        <h3 className="text-sm font-semibold text-gray-600 mb-2">Suggested Players</h3>
                        <div className="max-h-40 overflow-y-auto">
                            {suggestedUsers.slice(0, 3).map((user) => (
                                <div
                                    key={user?._id}
                                    className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer"
                                    onClick={() => handleStartChat(user)}
                                >
                                    <img
                                        src={user?.profilePicture || "/avatar.png"}
                                        alt={user?.name || "User"}
                                        className="w-10 h-10 rounded-full mr-3"
                                    />
                                    <div>
                                        <p className="font-semibold">{user?.name || "Unknown User"}</p>
                                        <p className="text-xs text-gray-500">@{user?.username || "unknown"}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    const renderChatWindow = () => {
        if (!selectedChat) return null;

        return (
            <div className="flex-1 flex flex-col h-full">
                <div className="p-4 bg-gray-100 border-b border-gray-200 flex items-center">
                    <img
                        src={selectedChat?.user?.profilePicture || "/avatar.png"}
                        alt={selectedChat?.user?.name || "User"}
                        className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                        <p className="font-semibold">{selectedChat?.user?.name || "Unknown User"}</p>
                        <p className="text-xs text-gray-500">@{selectedChat?.user?.username || "unknown"}</p>
                    </div>
                </div>
                <div
                    className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent hover:scrollbar-thumb-gray-500"
                    style={{
                        scrollbarWidth: "thin", // Firefox
                        scrollbarColor: "#a0aec0 transparent", // Firefox default
                    }}
                >
                    <style jsx>{`
                        .scrollbar-thin:not(:hover)::-webkit-scrollbar {
                            width: 0px;
                        }
                        .scrollbar-thin::-webkit-scrollbar {
                            width: 6px;
                        }
                        .scrollbar-thin::-webkit-scrollbar-thumb {
                            border-radius: 9999px;
                        }
                    `}</style>
                    {selectedChat?.messages?.length > 0 ? (
                        selectedChat.messages.map((msg) => (
                            <div
                                key={msg?._id}
                                className={`mb-2 flex ${msg?.sender?.toString() === authUser?._id?.toString() ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`max-w-xs p-3 rounded-lg ${msg?.sender?.toString() === authUser?._id?.toString()
                                        ? "bg-green-500 text-white"
                                        : "bg-gray-200 text-gray-800"
                                        }`}
                                >
                                    <p>{msg?.content || "Message unavailable"}</p>
                                    <p className="text-xs mt-1 opacity-75">
                                        {msg?.createdAt
                                            ? new Date(msg.createdAt).toLocaleTimeString()
                                            : "Unknown time"}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center">No messages yet. Say hi!</p>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                <div className="p-4 border-t border-gray-200 flex items-center">
                    <input
                        type="text"
                        value={messageContent}
                        onChange={(e) => setMessageContent(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type a message..."
                        className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        disabled={isSending}
                    />
                    <button
                        onClick={handleSendMessage}
                        className="p-2 bg-green-500 text-white rounded-r-lg hover:bg-green-600 disabled:bg-gray-400"
                        disabled={isSending}
                    >
                        <Send size={20} />
                    </button>
                </div>
            </div>
        );
    };

    if (authLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
                <p className="text-gray-600">Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-[90vh] bg-gradient-to-br from-green-50 to-blue-50 flex flex-col">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 container mx-auto pt-8 pb-4 px-4 flex-1">
                <div className="col-span-1 lg:col-span-1">
                    <Sidebar user={authUser} />
                </div>
                <div className="col-span-1 lg:col-span-3 flex flex-col">
                    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 flex max-h-[31.625rem]">
                        <div className="w-1/3 border-r border-gray-200 pr-4">{renderChatHistory()}</div>
                        <div className="w-2/3 pl-4">{renderChatWindow()}</div>
                    </div>
                </div>
            </div>
            <footer className="mt-2 pb-6">
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